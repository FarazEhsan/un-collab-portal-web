module.exports = {
    apps: [
      {
        name: "un-collab-portal-web",
        script: "./node_modules/next/dist/bin/next",
        args: "start -p " + process.env.PORT,
        watch: false,
        autorestart: true,
      },
    ],
  };