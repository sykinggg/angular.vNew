import * as gulp from 'gulp';
import { Pipe, Operation, IMap, IDynamicTaskOption, RunWay, ITaskConfig } from 'development-core';
import { Development, ITaskOption, IContext } from 'development-tool';
import 'development-tool-node';
import * as path from 'path';
import * as fs from 'fs';

const htmlMin = require('gulp-minify-html');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const del = require('del');
const through = require('through2');
const rollup = require('gulp-rollup');
const resolve = require('rollup-plugin-node-resolve');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const commonjs = require('rollup-plugin-commonjs');
const builtins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');

Development.create(gulp, __dirname, [
    <ITaskConfig>{
        name: 'libs',
        src: './',
        dist: 'lib',
        testSrc: 'test/**/*.spec.ts',
        loader: 'development-tool-node',
        asserts: {
            css: {
                src: './**/*.css',
                pipes: [
                    ctx => cleanCSS()
                ]
            },
            scss: {
                src: './**/*.scss',
                loader: [{
                    oper: Operation.default | Operation.autoWatch,
                    pipes: [
                        (ctx) => sass({
                            outputStyle: 'compressed',
                            includePaths: [
                                ctx.toDistPath('asserts'),
                                ctx.toRootPath('../node_modules/bootstrap/scss')
                            ]
                        }).on('error', sass.logError)
                    ]
                }]
            },
            template: {
                src: ['./**/*.template.html', './**/*.component.html', './**/*.tpl.html'],
                loader: [{
                    oper: Operation.default | Operation.autoWatch,
                    pipes: [() => htmlMin({
                        empty: true,
                        spare: true,
                        quotes: true,
                        dom: {
                            lowerCaseAttributeNames: false,
                            lowerCaseTags: false
                        }
                    })]
                }]
            }
        }
    },
    <ITaskOption>{
        src: 'lib/**/*.js',
        dist: 'lib',
        loader: [
            {
                name: 'inline',
                pipes: [
                    ctx => through.obj(function (file, encoding, callback) {
                        if (file.isNull()) {
                            return callback(null, file);
                        }

                        if (file.isStream()) {
                            return callback('doesn\'t support Streams');
                        }

                        let contents: string = file.contents.toString('utf8');
                        let regexp = /require\(\'\S+!text\'\)/gi;
                        let matchs = contents.match(regexp);
                        if (matchs) {
                            matchs.forEach(match => {
                                let basepath = path.dirname(file.history[0]);
                                let res = match.replace(`require('`, '').replace(`!text')`, '');
                                res = path.join(basepath, res.replace('./', ''));
                                console.log(match, res);
                                if (fs.existsSync(res)) {
                                    let content = fs.readFileSync(res, { encoding: 'utf8' });
                                    content = content.trim().replace(/\'/gi, '\\\'')
                                        .replace(/\"/gi, '\\\"');
                                    contents = contents.replace(match, `'${content}'`)
                                }
                            });
                        }
                        file.contents = new Buffer(contents);
                        this.push(file);
                        callback();
                    })
                ]
            }
        ]
    },
    <ITaskOption>{
        src: ['lib/**/*.js'],
        dist: 'bundles',
        oper: Operation.release | Operation.deploy,
        loader: [
            {
                name: 'delbundles',
                task: () => del('bundles')
            },
            {
                name: 'browser',
                pipes: [
                    (ctx) => {
                        return rollup({
                            output: {
                                name: 'dashboard.umd.js',
                                format: 'umd',
                                globals: {
                                    'reflect-metadata': 'Reflect',
                                    'lodash': '_'
                                }
                            },
                            plugins: [
                                resolve(),
                                commonjs(),
                                globals(),
                                builtins(),
                                rollupSourcemaps()
                            ],
                            external: [
                                'reflect-metadata',
                                'tslib',
                                '@ts-ioc/core',
                                '@ts-ioc/platform-browser',
                                'lodash',
                                'rxjs',
                                '@angular/core',
                                '@angular/common',
                                '@angular/common/http',
                                '@angular/forms',
                                '@angular/router',
                                '@ngx-translate/core',
                                '@ng-bootstrap/ng-bootstrap',
                                'core-services/core'
                            ],
                            input: './lib/index.js'
                        })
                    },
                    () => rename('dashboard.umd.js'),
                ]
            },
            {
                name: 'zip',
                src: 'bundles/dashboard.umd.js',
                pipes: [
                    () => rename('dashboard.umd.min.js'),
                    () => uglify()
                ]
            }
        ]
    }
]).start();
