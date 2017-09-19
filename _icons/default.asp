<% 
    template = ""
    leftCol = false
    rightCol = false

	StrTitle = "Icons"
	StrSection = "forms"
%>
<!--#include virtual="/_includes/shared/top.asp" -->

<div class="row">
	<div class="large-12 columns">
		<h1><%=StrTitle%> h1</h1>
		<h2 class="icon-home"><%=StrTitle%> h2</h2>
		<h3 class="icon-home"><%=StrTitle%> h3</h3>
		<h4 class="icon-home"><%=StrTitle%> h4</h4>
		<h5 class="icon-home"><%=StrTitle%> h5</h5>
		<h6 class="icon-home"><%=StrTitle%> h6</h6>
		<hr />

		<button class="button">Default Button</button>
		<button class="button tiny">Tiny Button</button>
		<button class="button small">Small Button</button>
		<button class="button large">Large Button</button>
		<hr />

		<button class="button secondary">Default Button</button>
		<button class="button secondary tiny">Tiny Button</button>
		<button class="button secondary small">Small Button</button>
		<button class="button secondary large">Large Button</button>
		<hr />

		<button class="button icon-asterisk">Default Button</button>
		<button class="button icon-asterisk tiny">Tiny Button</button>
		<button class="button icon-asterisk small">Small Button</button>
		<button class="button icon-asterisk large">Large Button</button>
		<hr />

		<a href="#" class="button">Text</a>
		<a href="#" class="button icon-asterisk">Icon</a>
		<a href="#" class="button icon-asterisk no-text"><span>Icon Only</span></a>
		<hr />

		<a href="#" class="button small">Text</a>
		<a href="#" class="button icon-asterisk small">Icon</a>
		<a href="#" class="button icon-asterisk small no-text"><span>Icon Only</span></a>
		<hr />

		<a href="#" class="button tiny">Text</a>
		<a href="#" class="button icon-asterisk icon-asterisk tiny">Icon</a>
		<a href="#" class="button icon-asterisk tiny no-text"><span>Icon Only</span></a>
		<hr />

		<p><a href="#" data-tooltip rel="external" title="Opens in a new window">External link with an icon</a></p>
		<p>This is simply dummy text with a <a href="#">standard link</a>, an <a href="#" data-tooltip rel="external" title="Opens in a new window">external link with an icon</a>  and an <a href="#" data-tooltip rel="external" class="noIconTest" title="Opens in a new window">external link with no icon</a>. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

		<hr />

		<ul>
			<li class="icon-home">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li>
			<li class="icon-phone">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li>
			<li class="icon-flag">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li>
		</ul>
		<ul>
			<li class="icon-anchor">Lorem Ipsum</li>
			<li class="icon-phone">Lorem Ipsum</li>
			<li class="icon-flag">Lorem Ipsum</li>
		</ul>

		<hr />

		<ul class="blockTest">
			<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li>
			<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li>
			<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</li>
		</ul>
		<ul class="blockTest">
			<li>Lorem Ipsum</li>
			<li>Lorem Ipsum</li>
			<li>Lorem Ipsum</li>
		</ul>

		<hr />

		<ul class="button-group">
			<li><a href="#" class="button">Text</a></li>
			<li><a href="#" class="button">Text</a></li>
			<li><a href="#" class="button">Text</a></li>
		</ul>
		<ul class="button-group">
			<li><a href="#" class="button">Text</a></li>
			<li><a href="#" class="button icon-asterisk">Icon</a></li>
			<li><a href="#" class="button icon-asterisk no-text"><span>Icon Only</span></a></li>
		</ul>
		<ul class="button-group">
			<li><a href="#" class="button icon-asterisk">Icon</a></li>
			<li><a href="#" class="button icon-asterisk">Icon</a></li>
			<li><a href="#" class="button icon-asterisk">Icon</a></li>
		</ul>
		<ul class="button-group">
			<li><a href="#" class="button icon-asterisk no-text"><span>Icon Only</span></a></li>
			<li><a href="#" class="button icon-asterisk no-text"><span>Icon Only</span></a></li>
			<li><a href="#" class="button icon-asterisk no-text"><span>Icon Only</span></a></li>
		</ul>

		<hr />

		<ul class="button-group">
			<li><a href="#" class="button small">Text</a></li>
			<li><a href="#" class="button small">Text</a></li>
			<li><a href="#" class="button small">Text</a></li>
		</ul>
		<ul class="button-group">
			<li><a href="#" class="button small">Text</a></li>
			<li><a href="#" class="button small icon-asterisk">Icon</a></li>
			<li><a href="#" class="button small icon-asterisk no-text"><span>Icon Only</span></a></li>
		</ul>
		<ul class="button-group">
			<li><a href="#" class="button small icon-asterisk">Icon</a></li>
			<li><a href="#" class="button small icon-asterisk">Icon</a></li>
			<li><a href="#" class="button small icon-asterisk">Icon</a></li>
		</ul>
		<ul class="button-group">
			<li><a href="#" class="button small icon-asterisk no-text"><span>Icon Only</span></a></li>
			<li><a href="#" class="button small icon-asterisk no-text"><span>Icon Only</span></a></li>
			<li><a href="#" class="button small icon-asterisk no-text"><span>Icon Only</span></a></li>
		</ul>

		<hr />

		<ul class="button-group">
			<li><a href="#" class="button tiny">Text</a></li>
			<li><a href="#" class="button tiny">Text</a></li>
			<li><a href="#" class="button tiny">Text</a></li>
		</ul>
		<ul class="button-group">
			<li><a href="#" class="button tiny">Text</a></li>
			<li><a href="#" class="button tiny icon-asterisk">Icon</a></li>
			<li><a href="#" class="button tiny icon-asterisk no-text"><span>Icon Only</span></a></li>
		</ul>
		<ul class="button-group">
			<li><a href="#" class="button tiny icon-asterisk">Icon</a></li>
			<li><a href="#" class="button tiny icon-asterisk">Icon</a></li>
			<li><a href="#" class="button tiny icon-asterisk">Icon</a></li>
		</ul>
		<ul class="button-group">
			<li><a href="#" class="button tiny icon-asterisk no-text"><span>Icon Only</span></a></li>
			<li><a href="#" class="button tiny icon-asterisk no-text"><span>Icon Only</span></a></li>
			<li><a href="#" class="button tiny icon-asterisk no-text"><span>Icon Only</span></a></li>
		</ul>



	</div>
</div>



<!--#include virtual="/_includes/shared/bottom.asp" -->