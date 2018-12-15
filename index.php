<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WP Vue</title>
  <link rel='shortcut icon' type='image/x-icon' href='/src/assets/img/favicon.ico' />
  <link rel="preload" href="https://fonts.googleapis.com/css?family=Open+Sans:100,300,400|Nunito:400,800" as="style" onload="this.rel='stylesheet'">
  <script src="/src/vendor/loadCSS.js"></script>

  <meta name="description" content="Just a simple Vue blog that displays posts via the WordPress REST API. Fork it and rip it up!">
  <meta name="keywords" content="Vue,JavaScript,WordPress,REST API">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta property="og:site_name" content="WP Vue" />
  <meta property="og:locale" content="en_us" />
  <meta property="og:description" content="Just a simple Vue blog that displays posts via the WordPress REST API. Fork it and rip it up!" />
  <meta property="og:title" content="WP Vue" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="About" />
  <meta name="twitter:description" content="Just a simple Vue blog that displays posts via the WordPress REST API." />
  <?php wp_head(); ?>
</head>
<body>
  <div id="app"></div>
  <?php wp_footer(); ?>
</body>
</html>