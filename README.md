[公式の backlog-mcp-server](https://github.com/nulab/backlog-mcp-server/blob/main/README.ja.md)がリリースされましたのでそちらをご利用ください。

---

## Requirements

- Nodejs 20 以上, NPM 10 以上

## 機能

- [課題情報の取得](https://developer.nulab.com/ja/docs/backlog/api/2/get-issue/)
- [課題コメントの取得](https://developer.nulab.com/ja/docs/backlog/api/2/get-comment-list/)
- [課題添付ファイルのダウンロード](https://developer.nulab.com/ja/docs/backlog/api/2/get-issue-attachment/)
- [課題添付ファイル一覧の取得](https://developer.nulab.com/ja/docs/backlog/api/2/get-list-of-issue-attachments/)
- [課題共有ファイル一覧の取得](https://developer.nulab.com/ja/docs/backlog/api/2/get-list-of-linked-shared-files/)

## Install

- 下記のように backlog-mcp-server の設定を追加します。
  - BACKLOG_API_KEY は、https://your-space.backlog.jp/EditApiSettings.action
  - BACKLOG_DOMAIN は、 https://your-space.backlog.jp ならば、your-space.backlog.jp です

```jsonc
{
  "mcpServers": {
    "backlog": {
      "autoApprove": [
        "get_issue",
        "get_issue_comments",
        "get_issue_attachments",
        "get_issue_attachment",
        "get_issue_shared_files",
        "get_issue_types"
      ],
      "disabled": false,
      "timeout": 60,
      "command": "npx",
      "args": [
        "-y",
        "https://github.com/shueisha-arts-and-digital/backlog-mcp-server"
      ],
      "env": {
        "BACKLOG_DOMAIN": "your-space.backlog.jp",
        "BACKLOG_API_KEY": "****"
      },
      "transportType": "stdio"
    }
  }
}
```
