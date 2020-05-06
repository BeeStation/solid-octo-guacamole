module.exports = (app) => {
  // Your code here
  app.log('Yay! The app was loaded!')

  // example of probot responding 'Hello World' to a new issue being opened
  app.on(['pull_request.opened', 'pull_request.reopened'], async context => {
    
    const config = await context.config("label.yml")
    
    if (!config) {
      console.log("Config missing!")
      return
    }
    
    var labelsToAdd = []
    
    var body = context.payload.pull_request.body
    
    if (body.includes(":cl:")) {
      var capture = body.match(/:cl:(.|\n|\r)*?\/:cl:/gm)
      console.log(capture)
    }
    
    for (let token in config.tags) {
      if (capture.toString().includes(token)) {
        labelsToAdd.push(config.tags[token])
      }
    }
    
    return context.github.issues.addLabels(context.issue({ labels: labelsToAdd }))

  })
}
