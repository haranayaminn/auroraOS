# AuroraOS

PC・スマホ向けのWebアプリ型ホーム画面（PWAスターター）です。

## できること
- レスポンシブなアプリ一覧、検索、時計
- 自分のWebアプリURLの登録・編集・削除
- 表示名とアクセントカラーの設定
- ホーム画面追加用のPWAマニフェスト
- Service Workerによるホーム画面の基本ファイルのキャッシュ

## ローカルで試す
ブラウザで `index.html` を開いても基本UIは確認できます。PWA機能とService Workerを試すにはHTTPS、またはlocalhostで配信してください。

## 無料で公開する例：GitHub Pages
1. GitHubで新しいリポジトリ（例：`auroraos`）を作る。
2. このフォルダ内のファイルをリポジトリ直下にアップロードする。
3. GitHubのリポジトリで Settings → Pages を開く。
4. Build and deployment を `Deploy from a branch`、ブランチを `main`、フォルダを `/ (root)` にして保存する。
5. 表示された `https://ユーザー名.github.io/auroraos/` を開く。

## 自作アプリを登録する
1. 自作アプリをVercelやRenderなどにデプロイし、公開URLを確認する。
2. AuroraOSで「アプリを追加」を押す。
3. 名前、公開URL（https://...）、アイコンを指定して保存する。
4. アイコンを押すと新しいタブで開く。

## 大事な制約
- 現段階ではアプリ一覧・設定はそのブラウザの `localStorage` に保存されます。別端末とは同期されません。
- アプリは別タブで起動します。埋め込み表示は、相手サイトの `X-Frame-Options` や CSP により拒否される場合があるため採用していません。
- このホーム画面は本物のOSではありません。Windows/Android/iOSのOS機能や任意のPCプログラムを自由に実行する権限はありません。
- `example.com` のAurora Musicは登録例です。実際のAurora Musicの公開URLに編集してください。
- ログイン機能や端末間同期はまだありません。必要になった段階で認証・DBを追加してください。
