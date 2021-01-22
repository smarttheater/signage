// 開発or本番モードの選択(development、production、noneのいずれか設定必須)
// development: 開発時のファイル出力のモード(最適化より時間短縮,エラー表示などを優先)
// production: 本番時のファイル出力のモード(最適化されて出力される)
const MODE = 'development';
// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === 'development';

// ファイル出力時の絶対パス指定に使用
const path = require('path');

// プラグイン
// js最適化
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  // エントリーポイント(メインのjsファイル)
  entry: './src/client/main.js',
  // ファイルの出力設定
  output: {
    // 出力先(絶対パスでの指定必須)
    path: path.resolve(__dirname, 'dist/client'),
    // 出力ファイル名
    filename: 'main.js'
  },
  mode: MODE,
  // ソースマップ有効
  devtool: 'source-map',
  // ローダーの設定
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        // ローダーの対象 // 拡張子 .js の場合
        test: /\.js$/,
        // ローダーの処理対象から外すディレクトリ
        exclude: /node_modules/,
        // Babel を利用する
        loader: 'babel-loader',
        // Babel のオプションを指定する
        options: {
          presets: [
            // プリセットを指定することで、ES2019 を ES5 に変換
            '@babel/preset-env'
          ]
        }
      }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    // Webpackで利用するときの設定
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    // Vueを読み込めるようにするため
    new VueLoaderPlugin()
  ],
  // mode:puroductionでビルドした場合のファイル圧縮
  optimization: {
    minimizer: production
      ? []
      : [
        // jsファイルの最適化
        new TerserPlugin({
          // すべてのコメント削除
          extractComments: 'all',
          // console.logの出力除去
          terserOptions: {
            compress: { drop_console: true }
          },
        }),
      ]
  },
};