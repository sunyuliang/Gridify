import{r as i,o as r,c as p,a as s,b as a,w as t,F as l,e as o,d as n}from"./app.47d42b3d.js";import{_ as c}from"./plugin-vue_export-helper.21dcd24c.js";const u={},d=o(`<h2 id="using-gridify-in-api-controllers" tabindex="-1"><a class="header-anchor" href="#using-gridify-in-api-controllers" aria-hidden="true">#</a> Using Gridify in API Controllers</h2><p>On of the best use cases of this library is Asp-net APIs, When you need to get some string base filtering conditions to filter data or sort it by a field name or apply pagination concepts to your lists and return a pageable, data grid ready information, from any repository or database. Although, we are not limited to Asp.net projects and we can use this library on any .Net projects and on any collections.</p><p>In following, we will see a simple example but it is enough to understand the basic concepts of Gridify.</p><h3 id="descibing-scenario" tabindex="-1"><a class="header-anchor" href="#descibing-scenario" aria-hidden="true">#</a> Descibing Scenario</h3><p>Imagine you have an API that returns a list of users. We want to use this API in our client side application to show a list of users.</p><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token comment">// UserController</span>
<span class="token comment">// ...</span>
<span class="token keyword">public</span> <span class="token return-type class-name">IEnumerable<span class="token punctuation">&lt;</span>User<span class="token punctuation">&gt;</span></span> <span class="token function">GetUsers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// context can be entity framework, a repository or whatever</span>
    <span class="token keyword">return</span> context<span class="token punctuation">.</span>Users<span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><em>There are a few problems:</em></p><ul><li>The end-user may want to <strong>sort</strong> the list by name, or by age, or by any other property.</li><li>The end-user may want to <strong>filter</strong> the list by name, or by age, or by any other property.</li><li>Fetching entire list of users is not efficient, so we need somehow add pagination.</li><li>Returning a list of page size <code>N</code>is not enough, we also need to know the total number of users.</li></ul><p>Implementing these features is not easy or at least <strong>clean</strong>. we need to write a lot of code with if-else statements if we want to support all reasonable properties. This is where Gridify comes in.</p><h3 id="solving-problems-using-gridify" tabindex="-1"><a class="header-anchor" href="#solving-problems-using-gridify" aria-hidden="true">#</a> Solving problems using Gridify</h3><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">Paging<span class="token punctuation">&lt;</span>User<span class="token punctuation">&gt;</span></span> <span class="token function">GetUsers</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">FromQuery</span></span><span class="token punctuation">]</span> <span class="token class-name">GridifyQuery</span> query<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> context<span class="token punctuation">.</span>Users<span class="token punctuation">.</span><span class="token function">Gridify</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>All the magic is done by Gridify.</p><h3 id="what-is-paging-return-value" tabindex="-1"><a class="header-anchor" href="#what-is-paging-return-value" aria-hidden="true">#</a> What is Paging return value?</h3><p>The Paging class is simply a generic DTO(Data Transfer Object) That has two properties:</p><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Count <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token return-type class-name">IEnumerable<span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span> Data <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="what-is-gridifyquery" tabindex="-1"><a class="header-anchor" href="#what-is-gridifyquery" aria-hidden="true">#</a> What is GridifyQuery?</h3><p>GridifyQuery is a class that represents the query parameters that are passed to the Gridify method.</p>`,17),h=n("Learn more about GridifyQuery"),m=n("."),g=o(`<h3 id="sample-request-query-string" tabindex="-1"><a class="header-anchor" href="#sample-request-query-string" aria-hidden="true">#</a> Sample request query string</h3><p>to make the example readable this <strong>isn&#39;t encoded</strong> url, make sure to always <strong>encode</strong> the query strings before passing it to your APIs</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>http://exampleDomain.com/api/GetUsers?
          pageSize=100&amp;
          page=1&amp;
          orderBy=FirstName&amp;
          filter=Age&gt;10
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Also, we can totally ignore GridifyQuery, and just use pagination default values which is <code>pageSize=20</code> and <code>page=1</code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>http://exampleDomain.com/api/GetPersons
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="more-information" tabindex="-1"><a class="header-anchor" href="#more-information" aria-hidden="true">#</a> More Information</h3>`,6),b={class:"custom-container tip"},y=s("p",{class:"custom-container-title"},"TIP",-1),f=n("If you want to controll what fields should be supported for filtering or ordering, you can use the "),k=n("GridifyMapper"),_=n(" class."),w=n("All "),x=n("gridify extension methods"),v=n(" accept a GridifyMapper instance as a parameter."),G=n("If you want to lean more about "),I=n("filtering"),q=n(" and "),A=n("ordering"),T=n(" syntex, make sure to read related documentations.");function P(U,N){const e=i("RouterLink");return r(),p(l,null,[d,s("p",null,[a(e,{to:"/guide/gridifyQuery.html"},{default:t(()=>[h]),_:1}),m]),g,s("div",b,[y,s("ul",null,[s("li",null,[s("p",null,[f,a(e,{to:"/guide/gridifyMapper.html"},{default:t(()=>[k]),_:1}),_])]),s("li",null,[s("p",null,[w,a(e,{to:"/guide/extensions.html"},{default:t(()=>[x]),_:1}),v])]),s("li",null,[s("p",null,[G,a(e,{to:"/guide/filtering.html"},{default:t(()=>[I]),_:1}),q,a(e,{to:"/guide/ordering.html"},{default:t(()=>[A]),_:1}),T])])])])],64)}var C=c(u,[["render",P]]);export{C as default};
