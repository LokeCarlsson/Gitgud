import nodemailer from 'nodemailer'
import Github from '../models/githubModel'

export const sendEmail = (receiver, eventBody) => {
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'gitgudmailer@gmail.com',
          pass: 'gitgud123'
      }
  })

  const mailOptions = {
    from: '"Gitgud" <gitgudmailer@gmail.com>',
    to: receiver,
    subject: 'A new event has happened on Gitgud!',
    text: eventBody
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  })
}

export const filterEvent = (request) => {
  console.log(request.headers['x-github-event'])
  const event = convertWord(request.headers['x-github-event'])
  const org = request.body.organization.login
  const subs = getSubscribers(org)
  subs.then((subscribers) => {
    const res = subscribers.filter(sub => {
      const userOrgSettings = sub.organizations.find(orgDetails => orgDetails.name == org)
      return userOrgSettings[event] === true
    })
    if (res.length > 0) {
      const receivers = res.reduce((string, user) => string.concat(`${user.email}, `), '')
      sendEmail(receivers, event)
      console.log('Sent..')
    }
  })
}

const convertWord = (word) => {
  switch (word) {
    case 'push':
      return 'pushes'
      break
    case 'issues':
      return 'issues'
      break
    case 'release':
      return 'releases'
      break
    default:
      return ''
      break
  }
}

const getSettings = (sub) => {
  sub.organizations.forEach(function(el) {
    // console.log('org: ', el)
    if (request.headers['x-github-event'] === 'push') {
      if (el['pushes'] === true) {
        console.log('123: ', el[request.headers['x-github-event']].name)
      }
    } else if (request.headers['x-github-event'] === 'issues') {
      if (el['issues'] === true) {
        console.log('123: ', el[request.headers['x-github-event']].name)
      }
    } else if (request.headers['x-github-event'] === 'release') {
      if (el['releases'] === true) {
        console.log('123: ', el[request.headers['x-github-event']].name)
      }
    }
  })
}



const getSubscribers = (organization) => {
  return Github.find({ "organizations": {$elemMatch: {name: organization} } }
    , 'displayName organizations email', (err, users) => {
    if (err)
      console.log(err)

    // console.log(users)
  })
}