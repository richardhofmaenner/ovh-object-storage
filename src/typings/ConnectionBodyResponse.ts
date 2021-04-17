export interface ConnectionBodyResponse {
  token: {
    is_domain: boolean,
    methods: string[],
    roles: [],
    is_admin_project: boolean,
    project: {
      domain: [],
      id: string,
      name: string,
    },
    catalog: {
      endpoints: {
        url: string,
        interface: string,
        region: string,
        region_id: string
      }[],
      type: string,
      id: string,
      name: string
    }[],
    expires_at: string,
    user: {
      password_expires_at: null | string,
      domain: {
        id: string,
        name: string
      },
      id: string,
      name: string,
    },
    audit_ids: string[],
    issued_at: string
  }
}
