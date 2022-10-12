import vue from 'rollup-plugin-vue'
import jsonResolve from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs';
import postcssImport from 'postcss-import';
import vueJsx from '@vitejs/plugin-vue-jsx'



export default {
    input: './packages/index.js',
    output: {
        name: 'index',
        file: 'dist_publish/index.js',
        format: 'es'
    },
    plugins: [
        jsonResolve(),
        nodeResolve(),
        vue(),
        vueJsx(),
        postcss({
            extensions: [".css"],
            extract: true,
            plugins: [postcssImport()]
        }),
        commonjs({
            include: [
                "node_modules/**",
                "node_modules/**/*"
            ]
        }),
    ],
    external: ['vue']
}