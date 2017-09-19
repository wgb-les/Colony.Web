<?php include_once('functions.php'); ?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
  <title>StyleLibrary - Style Guide</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#000000">

  <!-- Style Guide Boilerplate Styles -->
  <link rel="stylesheet" href="css/sg-style.css">
  <!--[if lt IE 9]><link rel="stylesheet" href="css/sg-style-old-ie.css"><![endif]-->

  <!-- https://github.com/sindresorhus/github-markdown-css -->
  <link rel="stylesheet" href="css/github-markdown.css">

  <!-- Replace below stylesheet with your own stylesheet -->
	<link href="/_css/brands/wg/dist/foundation.min.css" rel="stylesheet" />
    <link href="/_css/css/wg.css" rel="stylesheet" />
    <!-- fonts -->
    <link rel="stylesheet" type="text/css" href="/_fonts/MyFontsWebfontsKit/MyFontsWebfontsKit.css" />
    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Open+Sans" rel="stylesheet"> 
    <!-- scripts -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
    <script src="/_js/smoothscroll.js"></script>

  <!-- prism Syntax Highlighting Styles -->
  <link rel="stylesheet" href="vendor/prism/prism.css">
</head>
<body style="max-width:1200px;">
  <a href="#main" class="sg-visually-hidden sg-visually-hidden-focusable">Skip to main content</a>

  <div id="top" class="sg-header" role="banner">
    <div class="sg-container">
      <div class="sg-logo" style="color:white;">
        <img src="http://www.stylelibrary.com/_images/brands/wg/logos/StyleLibrary.png" style="width:300px;">
      </div>
      <button type="button" class="sg-nav-toggle">Menu</button>
    </div>
  </div><!--/.sg-header-->

  <div class="sg-wrapper sg-clearfix">
    <div id="nav" class="sg-sidebar" role="navigation">
      <h2 class="sg-h2 sg-subnav-title" style="color:white;">About</h2>
      <ul class="sg-nav-group">
        <li>
          <a href="#sg-about">Getting Started</a>
        </li>
        <li>
          <a href="#sg-colors">Colors</a>
        </li>
        <li>
          <a href="#sg-fontStacks">Fonts</a>
        </li>
      </ul>

      <?php listFilesInFolder('markup'); ?>
    </div><!--/.sg-sidebar-->

    <div id="main" class="sg-main" role="main">
      <div class="sg-container">
        <div class="sg-info">
          <div class="sg-about sg-section">
            <h2 id="sg-about" class="sg-h2">Getting Started with the Style Library UI Pattern Library</h2>
            <p>This UI Pattern Library is designed to promote visual consistency, unify designers and front-end developers and in doing so speed up development times.</p>
            <p>Each UI pattern is visually represented using 'live' css styling from the relevant active stylesheet (local, dev, staging etc). It therefore provides a quick visual test during development sprints.</p>
            <p>Where applicable colours, typography etc are given sass variables and these should be used in preference to css.</p>
            <p>Every UI pattern includes a 'view source' button from which the html of the element may be copied for use in your markup.</p>
            <p>NEW MARKUP: Each element of this pattern library is maintained at ~/style-guide/markup/patterns/</p>
          </div><!--/.sg-about-->

          <!-- Manually add your UI colors here. -->
          <div class="sg-colors sg-section">
            <h2 id="sg-colors" class="sg-h2">Colors</h2>
			<p>The colour pallette is defined as sass variables.</p> 
            <div class="sg-color-grid">
              <div class="sg-color">
                <div class="sg-color-swatch" style="background-color: #6a6869;"></div>
                <div class="sg-color-name">$scorpion</div>
                <div class="sg-color-value">#6a6869</div>
              </div>
              <div class="sg-color">
                <div class="sg-color-swatch" style="background-color: #d4bc60;"></div>
                <div class="sg-color-name">$tacha</div>
                <div class="sg-color-value">#d4bc60</div>
              </div>
              <div class="sg-color">
                <div class="sg-color-swatch" style="background-color: #cbc9c7;"></div>
                <div class="sg-color-name">$cloud</div>
                <div class="sg-color-value">#cbc9c7</div>
              </div>
              <div class="sg-color">
                <div class="sg-color-swatch" style="background-color: #f1f1f1;"></div>
                <div class="sg-color-name">$seashell</div>
                <div class="sg-color-value">#f1f1f1</div>
              </div>
              <div class="sg-color">
                <div class="sg-color-swatch" style="background-color: #000;"></div>
                <div class="sg-color-name">black</div>
                <div class="sg-color-value">#000000</div>
              </div>
            </div><!--/.sg-color-grid-->
          </div><!--/.sg-colors-->

          <!-- Manually add your fonts here. -->
          <div class="sg-font-stacks sg-section">
            <h2 id="sg-fontStacks" class="sg-h2">Font Stacks</h2>
			<p>Font sizes and tracking are defined as sass variables.</p>
            <dl class="sg-font-list">
            
              <dt><p>Primary Font:</p></dt>
              <dd style='font-family: ProximaNovaA-Light, 'Montserrat', 'Open Sans', Verdana, Geneva, sans-serif;'>font-family: ProximaNovaA-Light, 'Montserrat', 'Open Sans', Verdana, Geneva, sans-serif; $font-base:14px; @include tracking(30);</dd>

              <dt><p><i>Primary Font Italic:</i></p></dt>
              <dd style='font-family: ProximaNovaA-LightIt, 'Montserrat', 'Open Sans', Verdana, Geneva, sans-serif;font-style: italic;'>font-family: ProximaNovaA-LightIt, 'Montserrat', 'Open Sans', Verdana, Geneva, sans-serif;font-style: italic;</dd>

              <dt><p><strong>Primary Font Bold:</strong></p></dt>
              <dd style='font-family: ProximaNovaA-Semibold, 'Montserrat', 'Open Sans', Verdana, Geneva, sans-serif;font-weight: bold;'>font-family: ProximaNovaA-Semibold, 'Montserrat', 'Open Sans', Verdana, Geneva, sans-serif;font-weight: bold;</dd>
                
            </dl>
            <div class="sg-markup-controls"><a class="sg-btn--top" href="#top">Back to Top</a></div>
          </div><!--/.sg-font-stacks-->
        </div><!--/.sg-info-->

        <?php renderFilesInFolder('markup'); ?>
      </div><!--/.sg-container-->
    </div><!--/.sg-main-->
  </div><!--/.sg-wrapper-->

  <!--[if gt IE 8]><!--><script src="vendor/prism/prism.js"></script><!--<![endif]-->
  <script src="js/sg-scripts.js"></script>
</body>


<!-- sg additional styles -->
<style>
    .sg-header {
        background-color:#6a6869;
    }
    .sg-sidebar .sg-title {
        color:#fff;
    }
	.sg-btn--source {
		clear:both;
		margin-top:20px;
	}
</style>

</html>

