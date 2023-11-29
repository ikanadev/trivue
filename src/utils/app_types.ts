export enum AppTheme {
  Light = "light",
  Dark = "dark",
}

export enum AlertType {
  Neutral = "alert",
  Info = "alert-info",
  Success = "alert-success",
  Warning = "alert-warning",
  Error = "alert-error",
}

export type AppAlert = {
  type: AlertType,
  message: string,
}
