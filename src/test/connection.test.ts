import Storage from "../Storage";

require('dotenv').config({path: '/home/richard/Desktop/workspace/ovh-object-storage/.env'})

test('Check if AUTH_TOKEN is returned connection', async () => {
  const newStorage = new Storage(
    `${process.env.OPENSTACK_USER}`,
    `${process.env.OPENSTACK_PASSWORD}`,
    `${process.env.OPENSTACK_PROJECT_ID}`,
    `${process.env.OPENSTACK_REGION}`,
    `${process.env.AUTH_URL}`
  )

  await newStorage.connect()

  expect(typeof newStorage.AUTH_TOKEN).toBe('string')
})

test('Check if error is threw if an invalid option has been given', async () => {
  const newStorage = new Storage(
    `INVALID`,
    `${process.env.OPENSTACK_PASSWORD}`,
    `${process.env.OPENSTACK_PROJECT_ID}`,
    `${process.env.OPENSTACK_REGION}`,
    `${process.env.AUTH_URL}`
  )

  try {
    await newStorage.connect()
  } catch (e) {
    expect(e.code).toBe(401)
  }
})
