export interface PermissionCondition {
  user_created?: {
    _eq: string // Erwartet den speziellen Wert "$CURRENT_USER" oder eine spezifische UUID
  }
  public_edit?: {
    _eq: boolean // Erwartet den speziellen Wert "$CURRENT_USER" oder eine spezifische UUID
  }
}
