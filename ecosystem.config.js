module.exports = {
  apps : [{
    name: "Frontend",
    script: 'serve',
    watch: './frontend',
    env: {
      PM2_SERVE_PATH: "./frontend",
      PM2_SERVE_PORT: 8080
    }
  }, {
    name: "Backend",
    script: './backend/index.js',
    watch: './backend'
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
