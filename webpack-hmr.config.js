// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeExternals = require('webpack-node-externals');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    // 添加热更新插件
    entry: ['webpack/hot/poll?100', options.entry],
    // 添加node的externals，以防止打包时引入node_modules中的模块
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      // 添加热更新插件
      new webpack.HotModuleReplacementPlugin(),
      // 添加忽略文件夹的插件，以防止文件夹被重新加载
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      // 添加运行脚本插件，以支持运行时修改
      new RunScriptWebpackPlugin({
        name: options.output.filename,
        autoRestart: false,
      }),
    ],
  };
};
