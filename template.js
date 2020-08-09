let template = undefined;

// Disable React Devtools interaction in production

if(process.env.NODE_ENV === "development"){
    template = () => (
        `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Maksisoft ACL</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            </head>
            <body>
                <div id="root"></div>
                <script type="text/javascript" src="/dist/bundle.js"></script>
            </body>
        </html>
        `
    )
} else if(process.env.NODE_ENV === "production"){
    template = () => (
        `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Maksisoft ACL</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <script>
                    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {}
                </script>
            </head>
            <body>
                <div id="root"></div>
                <script type="text/javascript" src="/dist/bundle.js"></script>
            </body>
        </html>
        `
    )
}

export default template;