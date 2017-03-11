import axios from 'axios'

export const save = () => {
  
  


  // const query = {"username": request.user.username}
  // const update = {orgs: []}
  // const options = {new: true}
  // user.findOneAndUpdate(query, update, options, function(err, person) {
  //   if (err) {
  //     console.log('got an error')
  //   }
  //   console.log(person)
  //   return person
  // })
}

export const getOrgs = (request, res) => {
  return axios.get('https://api.github.com/user/orgs', {
    headers: {
      Authorization: 'token ' + request.user.githubToken,
      'User-Agent': 'Gitgud'
    }
  })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
}