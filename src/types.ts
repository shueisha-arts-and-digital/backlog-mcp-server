// Backlog API 共通の型定義
export interface BacklogUser {
  id: number;
  userId: string;
  name: string;
  roleType: number;
  lang: string;
  mailAddress: string;
}

export interface BacklogStatus {
  id: number;
  projectId: number;
  name: string;
  color: string;
  displayOrder: number;
}

export interface BacklogIssueType {
  id: number;
  projectId: number;
  name: string;
  color: string;
  displayOrder: number;
}

export interface BacklogResolution {
  id: number;
  name: string;
}

export interface BacklogPriority {
  id: number;
  name: string;
}

export interface BacklogAttachment {
  id: number;
  name: string;
  size: number;
  created: string;
  createdUser: BacklogUser;
}

export interface BacklogProject {
  id: number;
  projectKey: string;
  name: string;
  chartEnabled: boolean;
  subtaskingEnabled: boolean;
  textFormattingRule: string;
}

export interface BacklogCustomField {
  id: number;
  fieldType: string;
  name: string;
  value: any;
}

export interface BacklogIssue {
  id: number;
  projectId: number;
  issueKey: string;
  keyId: number;
  issueType: BacklogIssueType;
  summary: string;
  description: string;
  resolution: BacklogResolution | null;
  priority: BacklogPriority;
  status: BacklogStatus;
  assignee: BacklogUser | null;
  category: { id: number; name: string }[];
  versions: { id: number; name: string }[];
  milestone: { id: number; name: string }[];
  startDate: string | null;
  dueDate: string | null;
  estimatedHours: number | null;
  actualHours: number | null;
  parentIssueId: number | null;
  createdUser: BacklogUser;
  created: string;
  updatedUser: BacklogUser;
  updated: string;
  customFields?: BacklogCustomField[];
  attachments?: BacklogAttachment[];
}

export interface BacklogComment {
  id: number;
  content: string;
  changeLog: {
    field: string;
    originalValue: string;
    newValue: string;
  }[];
  createdUser: BacklogUser;
  created: string;
  updated: string;
  stars: {
    id: number;
    presenter: BacklogUser;
    created: string;
  }[];
  notifications: {
    id: number;
    alreadyRead: boolean;
    reason: number;
    user: BacklogUser;
    resourceAlreadyRead: boolean;
  }[];
}

// 課題取得API関連の型定義
export interface GetIssueParams {
  issueIdOrKey: string;
}

export type GetIssueResponse = BacklogIssue;

// 課題コメント取得API関連の型定義
export interface GetIssueCommentsParams {
  issueIdOrKey: string;
  minId?: number;
  maxId?: number;
  count?: number;
  order?: 'asc' | 'desc';
}

export interface GetIssueCommentsResponse {
  comments: BacklogComment[];
}

// 課題添付ファイル一覧取得API関連の型定義
export interface GetIssueAttachmentsParams {
  issueIdOrKey: string;
}

export interface GetIssueAttachmentsResponse {
  attachments: BacklogAttachment[];
}

// 課題添付ファイルダウンロードAPI関連の型定義
export interface GetIssueAttachmentParams {
  issueIdOrKey: string;
  attachmentId: string;
}

export interface GetIssueAttachmentResponse {
  fileData: string; // Base64エンコードされたファイルデータ
}

// 課題共有ファイル一覧取得API関連の型定義
export interface GetIssueSharedFilesParams {
  issueIdOrKey: string;
}

export interface SharedFile {
  id: number;
  type: string;
  dir: string;
  name: string;
  size: number;
  created: string;
  createdUser: BacklogUser;
  updated: string;
  updatedUser: BacklogUser;
}

export interface GetIssueSharedFilesResponse {
  sharedFiles: SharedFile[];
}
