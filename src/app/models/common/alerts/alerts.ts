export interface Alerts {
  type: 'primary' | 'success' | 'danger' | 'warning' | String;
  title: string;
  message: string;
  confirmation?: boolean;
  typeConfirmation?: string;
}
