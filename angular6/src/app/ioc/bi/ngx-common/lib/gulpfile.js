"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp = require("gulp");
var development_core_1 = require("development-core");
var development_tool_1 = require("development-tool");
require("development-tool-node");
var path = require("path");
var fs = require("fs");
var htmlMin = require('gulp-minify-html');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del');
var through = require('through2');
var rollup = require('gulp-rollup');
var resolve = require('rollup-plugin-node-resolve');
var rollupSourcemaps = require('rollup-plugin-sourcemaps');
var commonjs = require('rollup-plugin-commonjs');
var builtins = require('rollup-plugin-node-builtins');
var globals = require('rollup-plugin-node-globals');
development_tool_1.Development.create(gulp, __dirname, [
    {
        name: 'libs',
        src: './',
        dist: 'lib',
        testSrc: 'test/**/*.spec.ts',
        loader: 'development-tool-node',
        asserts: {
            css: {
                src: './**/*.css',
                pipes: [
                    function (ctx) { return cleanCSS(); }
                ]
            },
            scss: {
                src: './**/*.scss',
                loader: [{
                        oper: development_core_1.Operation.default | development_core_1.Operation.autoWatch,
                        pipes: [
                            function (ctx) { return sass({
                                outputStyle: 'compressed',
                                includePaths: [
                                    ctx.toDistPath('asserts'),
                                    ctx.toRootPath('../node_modules/bootstrap/scss')
                                ]
                            }).on('error', sass.logError); }
                        ]
                    }]
            },
            template: {
                src: ['./**/*.template.html', './**/*.component.html', './**/*.tpl.html'],
                loader: [{
                        oper: development_core_1.Operation.default | development_core_1.Operation.autoWatch,
                        pipes: [function () { return htmlMin({
                                empty: true,
                                spare: true,
                                quotes: true,
                                dom: {
                                    lowerCaseAttributeNames: false,
                                    lowerCaseTags: false
                                }
                            }); }]
                    }]
            }
        }
    },
    {
        src: 'lib/**/*.js',
        dist: 'lib',
        loader: [
            {
                name: 'inline',
                pipes: [
                    function (ctx) { return through.obj(function (file, encoding, callback) {
                        if (file.isNull()) {
                            return callback(null, file);
                        }
                        if (file.isStream()) {
                            return callback('doesn\'t support Streams');
                        }
                        var contents = file.contents.toString('utf8');
                        var regexp = /require\(\'\S+!text\'\)/gi;
                        var matchs = contents.match(regexp);
                        if (matchs) {
                            matchs.forEach(function (match) {
                                var basepath = path.dirname(file.history[0]);
                                var res = match.replace("require('", '').replace("!text')", '');
                                res = path.join(basepath, res.replace('./', ''));
                                console.log(match, res);
                                if (fs.existsSync(res)) {
                                    var content = fs.readFileSync(res, { encoding: 'utf8' });
                                    content = content.trim().replace(/\'/gi, '\\\'')
                                        .replace(/\"/gi, '\\\"');
                                    contents = contents.replace(match, "'" + content + "'");
                                }
                            });
                        }
                        file.contents = new Buffer(contents);
                        this.push(file);
                        callback();
                    }); }
                ]
            }
        ]
    },
    {
        src: ['lib/**/*.js'],
        dist: 'bundles',
        oper: development_core_1.Operation.release | development_core_1.Operation.deploy,
        loader: [
            {
                name: 'delbundles',
                task: function () { return del('bundles'); }
            },
            {
                name: 'browser',
                pipes: [
                    function (ctx) {
                        return rollup({
                            output: {
                                name: 'common.umd.js',
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
                        });
                    },
                    function () { return rename('common.umd.js'); },
                ]
            },
            {
                name: 'zip',
                src: 'bundles/common.umd.js',
                pipes: [
                    function () { return rename('common.umd.min.js'); },
                    function () { return uglify(); }
                ]
            }
        ]
    }
]).start();

//# sourceMappingURL=sourcemaps/gulpfile.js.map
