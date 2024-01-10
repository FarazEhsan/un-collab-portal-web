module.exports = {
    apps: [
      {
        name: "un-collab-portal-web",
        script: "./node_modules/next/dist/bin/next",
        args: "start -p " + 8000,
        watch: false,
        autorestart: true,
      },
    ],
  };