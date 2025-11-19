# Backlog MCP Server - AI エージェント向けドキュメント

## プロジェクト概要

Backlog MCP Server は、Model Context Protocol (MCP) を使用して Backlog API と連携するサーバーです。このサーバーを通じて、AI エージェント（Cursor Composer 等）が Backlog の課題情報、コメント、添付ファイルなどにアクセスできるようになります。

## アーキテクチャ

```
[AIエージェント] <---> [MCP Server] <---> [Backlog API]
```

### 主要コンポーネント

1. **MCP サーバー** (`src/index.ts`)

   - `@modelcontextprotocol/sdk` を使用して MCP サーバーを構築
   - 5 個のツールを登録（課題取得、コメント取得、添付ファイル取得など）
   - StdioServerTransport を使用して AI エージェントとの通信を確立

2. **Backlog API クライアント** (`src/client.ts`)

   - axios を使用して HTTP リクエストを行う
   - 認証情報（API トークン）を含めてリクエストを送信
   - エラーハンドリングとレスポンスの整形

3. **型定義システム** (`src/types.ts`)
   - TypeScript インターフェースによるデータ構造の型定義
   - API レスポンスの型安全性を確保

## 実装済み機能

### 課題情報取得

- ✅ `get_issue`: 課題の詳細情報を取得
- ✅ `get_issue_comments`: 課題のコメント一覧を取得（ページネーション対応）
- ✅ `get_issue_attachments`: 課題の添付ファイル一覧を取得
- ✅ `get_issue_attachment`: 課題の添付ファイルを Base64 エンコードでダウンロード
- ✅ `get_issue_shared_files`: 課題の共有ファイル一覧を取得

## 技術スタック

- **言語**: TypeScript
- **ランタイム**: Node.js 20 以上
- **主要ライブラリ**:
  - `@modelcontextprotocol/sdk`: ^1.10.0
  - `axios`: ^1.6.0
  - `zod`: ^3.22.4
- **ビルド**: TypeScript コンパイラ（ES Modules 形式）

## 環境変数

- `BACKLOG_API_TOKEN`: Backlog API の認証トークン（必須）
- `BACKLOG_SPACE`: Backlog のスペース ID（必須）
  - 例: `https://your-space.backlog.jp` の場合、`your-space` を指定

## 使用方法

### 設定例（Cursor Composer / MCP 設定）

```jsonc
{
  "mcpServers": {
    "backlog": {
      "autoApprove": [
        "get_issue",
        "get_issue_comments",
        "get_issue_attachments",
        "get_issue_attachment",
        "get_issue_shared_files"
      ],
      "disabled": false,
      "timeout": 60,
      "command": "npx",
      "args": ["-y", "https://github.com/pj8/backlog-mcp-server"],
      "env": {
        "BACKLOG_API_TOKEN": "****",
        "BACKLOG_SPACE": "your-space-here"
      },
      "transportType": "stdio"
    }
  }
}
```

## コードパターン

### エラーハンドリング

すべてのツールで統一されたエラーハンドリングパターンを使用：

```typescript
try {
  const result = await backlogClient.someMethod(params);
  return {
    content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
  };
} catch (error) {
  if (error instanceof Error) {
    return {
      content: [{ type: "text", text: error.message }],
      isError: true,
    };
  }
  return {
    content: [{ type: "text", text: "Unknown error" }],
    isError: true,
  };
}
```

### API クライアントの初期化

```typescript
const baseURL = `https://${space}.backlog.jp`;
this.client = axios.create({
  baseURL,
  params: {
    apiKey: apiToken,
  },
  headers: {
    "Content-Type": "application/json",
  },
});
```

### ツール定義パターン

```typescript
server.tool(
  "tool_name",
  {
    param: z.string().describe("パラメータの説明"),
  },
  async ({ param }) => {
    // 実装
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);
```

## 設計原則

1. **型安全性の重視**: TypeScript の型システムを活用して入出力を明確に定義
2. **明確な関心の分離**: サーバー、クライアント、型定義を個別のファイルに分割
3. **エラーの適切な処理**: すべての API コールでエラーをキャッチし、適切にフォーマット
4. **環境変数による設定**: API 認証情報は環境変数で注入
5. **明確なインターフェース**: ユーザー向けツールの入力パラメータには説明を付与

## データフロー

1. AI エージェントが MCP ツールを呼び出す
2. MCP サーバーがリクエストを受信し、パラメータを検証
3. BacklogClient が Backlog API に HTTP リクエストを送信
4. レスポンスを JSON 形式で整形
5. MCP サーバーが AI エージェントに結果を返却

## 制約事項

1. **認証**: Backlog の API トークンによる認証のみサポート
2. **通信プロトコル**: HTTPS のみ使用
3. **データフォーマット**: JSON のみ対応
4. **キャッシュ**: データはキャッシュせず、常に最新の情報を取得する設計
5. **レート制限**: Backlog API のレート制限に従う必要あり

## セキュリティ

- API トークンは環境変数で管理
- 通信は全て HTTPS 経由
- トークンの権限は必要最小限に設定することを推奨

## パフォーマンス考慮事項

- Backlog API へのリクエスト数を最小限に抑える
- レスポンスはキャッシュしない設計（常に最新データを取得）
- 大量のコメントがある課題では、ページネーションパラメータ（`count`, `minId`, `maxId`）を活用する

## 開発・ビルド

```bash
# 依存関係のインストール
npm install

# ビルド
npm run build

# 実行
npm start
```

## 参考リンク

- [Backlog API リファレンス](https://developer.nulab.com/ja/docs/backlog/api/2/)
- [MCP SDK ドキュメント](https://github.com/modelcontextprotocol/typescript-sdk)

## 今後の拡張可能性

- 課題検索機能の追加
- プロジェクト情報取得機能の追加
- ユーザー情報取得機能の追加
- Wiki 関連機能の追加
- より詳細なエラーメッセージの実装
- 再試行メカニズムの検討
