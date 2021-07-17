import {ConnectionBodyResponse} from "./typings/ConnectionBodyResponse";
import ErrorResponseBody from "./typings/ErrorResponseBody";
const fetch = require('node-fetch');

export default class Storage {
  readonly OPENSTACK_USER: string
  readonly OPENSTACK_PASSWORD: string
  readonly OPENSTACK_PROJECT_ID: string
  readonly OPENSTACK_REGION: string
  readonly AUTH_URL: string
  AUTH_TOKEN: string | undefined
  STORAGE_ENDPOINT: string | undefined

  /**
   * Creates a new Connection Instance to the given openstack Storage.
   *
   * @param openstack_user
   * @param openstack_password
   * @param openstack_project_id
   * @param openstack_region
   * @param auth_url
   */
  constructor(openstack_user: string, openstack_password: string, openstack_project_id: string, openstack_region: string, auth_url: string) {
    this.OPENSTACK_USER = openstack_user
    this.OPENSTACK_PASSWORD = openstack_password
    this.OPENSTACK_PROJECT_ID = openstack_project_id
    this.OPENSTACK_REGION = openstack_region
    this.AUTH_URL = auth_url
  }

  public async connect() {

    const bodyContent = {
      "auth": {
        "identity": {
          "methods": [
            "password"
          ],
          "password": {
            "user": {
              "name": this.OPENSTACK_USER,
              "domain": {
                "id": "default"
              },
              "password": this.OPENSTACK_PASSWORD
            }
          }
        },
        "scope": {
          "project": {
            "name": this.OPENSTACK_PROJECT_ID,
            "domain": {
              "id": "default"
            }
          }
        }
      }
    }

    const res: Response = await fetch(`${this.AUTH_URL}auth/tokens`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(bodyContent)
    })
    if (res.status !== 201) {
      const body: ErrorResponseBody = await res.json()
      throw body.error
    }
    const json: ConnectionBodyResponse = await res.json()
    const swiftElements = json.token.catalog.find(element => element.name === 'swift')
    // @ts-ignore
    this.STORAGE_ENDPOINT = swiftElements.endpoints.find(element => element.region_id === this.OPENSTACK_REGION).url
    this.AUTH_TOKEN = <string> res.headers.get('x-subject-token')
  }
}
