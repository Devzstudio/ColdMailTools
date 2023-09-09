import type { APIGatewayEvent, Context } from 'aws-lambda'
import { Resend } from 'resend'

import { logger } from 'src/lib/logger'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info(`${event.httpMethod} ${event.path}: sendMail function`)

  console.log('function called !!!!')

  console.log(event.headers)
  console.log(event.body)

  const { to, from, api_key, subject, message, html_email } = JSON.parse(
    event.body
  )

  console.log({
    to,
    from,
    api_key,
    subject,
    message,
    html_email,
  })

  const resend = new Resend(api_key)

  try {
    const data = await resend.emails.send({
      from: from,
      to: [to],
      subject: subject,
      html: html_email ? html_email : message,
    })

    console.log(data)
  } catch (error) {
    console.error(error)
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: 'Email send successfully',
    }),
  }
}
