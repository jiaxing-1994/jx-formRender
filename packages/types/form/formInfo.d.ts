export interface FormBaseInfo {
  id: string;
  tenantId: string;
  name: string;
  formTableName: string;
  supportedAuthenticationList?: Record<string, any>;
  supportedAuthenticationWayList?: Record<string, any>;
}
