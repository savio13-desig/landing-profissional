/* Landing de captação: monta as seções a partir de js/dados.js, com diagnóstico e formulários. */
(function () {
  "use strict";
  var P = window.PROFISSIONAL;
  var $ = function (s) { return document.querySelector(s); };
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var brl = function (v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }); };
  var zap = function (msg) { return "https://wa.me/" + P.whatsapp + "?text=" + encodeURIComponent(msg); };
  function plano(id) { return P.planos.filter(function (p) { return p.id === id; })[0]; }
  function inicial(n) { return n.split(" ").map(function (x) { return x.charAt(0); }).slice(0, 2).join(""); }
  function evento(nome, dados) { window.dataLayer = window.dataLayer || []; window.dataLayer.push(Object.assign({ event: nome }, dados)); } // pronto para Google Tag Manager / Meta Pixel

  /* ---------- seções fixas ---------- */
  function montar() {
    document.title = P.marca + " · Contabilidade para MEI e pequenas empresas";
    $("#n-marca").textContent = P.marca;
    $("#h-et").textContent = P.cargo + " · " + P.registro;
    $("#h-titulo").innerHTML = esc(P.headline).replace(/CNPJ/, "<em>CNPJ</em>");
    $("#h-sub").textContent = P.sub;
    $("#h-gar").textContent = P.garantia;
    $("#h-zap").href = zap("Olá, " + P.nome.split(" ")[0] + "! Vim pela página da " + P.marca + " e quero conversar sobre o meu CNPJ.");
    $("#b-zap").href = $("#h-zap").href;
    $("#numeros").innerHTML = P.numeros.map(function (n) { return "<div><b>" + esc(n.v) + "</b><span>" + esc(n.l) + "</span></div>"; }).join("");
    $("#dores-lista").innerHTML = P.dores.map(function (d) { return '<div class="cartao"><h3>' + esc(d.t) + "</h3><p>" + esc(d.d) + "</p></div>"; }).join("");
    $("#serv-lista").innerHTML = P.servicos.map(function (s) { return '<div class="cartao"><div class="icone" aria-hidden="true">' + esc(s.t.charAt(0)) + "</div><h3>" + esc(s.t) + "</h3><p>" + esc(s.d) + "</p></div>"; }).join("");
    $("#passos").innerHTML = P.passos.map(function (p, i) { return '<div class="cartao passo"><div class="n" aria-hidden="true">' + (i + 1) + "</div><h3>" + esc(p.t) + "</h3><p>" + esc(p.d) + "</p></div>"; }).join("");
    $("#planos-lista").innerHTML = P.planos.map(function (p) {
      return '<div class="cartao plano' + (p.destaque ? " destaque" : "") + '">' + (p.destaque ? '<span class="selo">Mais escolhido</span>' : "") + "<h3>" + esc(p.nome) + '</h3><p class="para">' + esc(p.para) + '</p><div class="valor">' + brl(p.preco) + "<small>/mês</small></div><ul>" +
        p.itens.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + '</ul><a class="btn ' + (p.destaque ? "btn-azul" : "btn-contorno") + '" href="#contato" data-plano="' + p.id + '">Quero este plano</a></div>';
    }).join("");
    $("#dep-lista").innerHTML = P.depoimentos.map(function (d) {
      return '<div class="cartao"><div class="estrelas" aria-label="5 de 5 estrelas">★★★★★</div><p class="aspas">“' + esc(d.t) + '”</p><div class="autor"><span class="avatar" aria-hidden="true">' + esc(inicial(d.n)) + "</span><span><b>" + esc(d.n) + "</b><small>" + esc(d.c) + "</small></span></div></div>";
    }).join("");
    $("#sobre-card").innerHTML = '<div class="cartao" style="text-align:center"><span class="avatar" style="width:96px;height:96px;font-size:2rem;margin:0 auto var(--e2)" aria-hidden="true">' + esc(inicial(P.nome)) + "</span><h3>" + esc(P.nome) + "</h3><p>" + esc(P.cargo) + " · " + esc(P.registro) + "</p></div>";
    $("#sobre-titulo").textContent = "Atendimento de perto, de verdade.";
    $("#sobre-txt").textContent = "Sou " + P.nome + ", " + P.cargo.toLowerCase() + ". Cuido de cada cliente pessoalmente e explico tudo em linguagem simples. " + P.horario + ". " + P.cidade + ".";
    $("#faq").innerHTML = P.faq.map(function (f) { return "<details><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>"; }).join("");
    $("#c-info").innerHTML = "<b>" + esc(P.horario) + "</b><br>" + esc(P.email);
    $("#f-nome").textContent = P.marca + " · " + P.nome + " · " + P.registro + " · " + P.cidade;
  }

  /* ---------- formulário de contato (usado no topo, no diagnóstico e no fim) ---------- */
  var seq = 0;
  function formHtml(rotulo) {
    var n = ++seq;
    return '<form class="f" novalidate data-n="' + n + '"><label for="fn' + n + '" style="margin-top:0">Seu nome</label><input type="text" id="fn' + n + '" autocomplete="name" maxlength="60">' +
      '<label for="ft' + n + '">WhatsApp</label><input type="tel" id="ft' + n + '" autocomplete="tel" inputmode="tel" placeholder="(11) 99999-9999" maxlength="16">' +
      '<label class="opc"><input type="checkbox" id="fo' + n + '"><span>Concordo em ser contatado(a) por ' + esc(P.marca) + ' sobre este pedido. Uso seus dados só para isso (LGPD).</span></label>' +
      '<p class="erro" id="fe' + n + '" role="alert" hidden></p><p style="margin:var(--e3) 0 0"><button class="btn btn-azul" type="submit" style="width:100%">' + esc(rotulo) + "</button></p></form>";
  }
  function ligarForm(caixa, ctx) {
    var f = caixa.querySelector("form"), n = f.dataset.n;
    function g(id) { return $("#" + id + n); }
    g("ft").addEventListener("input", function () {
      var d = this.value.replace(/\D/g, "").slice(0, 11), c = d.length > 10 ? 7 : 6, r = d;
      if (d.length > 2) r = "(" + d.slice(0, 2) + ") " + d.slice(2, c) + (d.length > c ? "-" + d.slice(c) : "");
      this.value = r;
    });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = g("fn").value.trim(), tel = g("ft").value.replace(/\D/g, ""), er = g("fe");
      function falha(t, el) { er.textContent = t; er.hidden = false; el.focus(); }
      if (nome.length < 2) return falha("Informe seu nome.", g("fn"));
      if (tel.length < 10) return falha("Informe um WhatsApp com DDD.", g("ft"));
      if (!g("fo").checked) return falha("Precisamos da sua autorização para entrar em contato.", g("fo"));
      var c = typeof ctx === "function" ? ctx() : ctx || {};
      var l = Leads.add({ nome: nome, tel: tel, origem: c.origem || "formulario", obs: c.obs || planoEscolhido(), plano: c.plano || "" });
      evento("generate_lead", { origem: l.origem, plano: l.plano });
      var msg = "Olá, " + P.nome.split(" ")[0] + "! Sou " + nome + ", vim pela página da " + P.marca + "." + (l.obs ? " " + l.obs : "");
      caixa.innerHTML = '<div class="sucesso" role="status"><h3>Recebi seus dados</h3><p>Obrigada, ' + esc(nome.split(" ")[0]) + "! Eu te chamo em até 4 horas úteis. Para adiantar, mande uma mensagem agora:</p>" +
        '<p><a class="btn btn-menta" target="_blank" rel="noopener" href="' + zap(msg) + '">Continuar no WhatsApp</a></p></div>';
    });
  }
  var escolhido = "";
  function planoEscolhido() { return escolhido ? "Interesse no plano " + plano(escolhido).nome + "." : ""; }
  function formularios() {
    document.querySelectorAll("[data-form]").forEach(function (c) {
      c.innerHTML = formHtml(c.dataset.rotulo);
      ligarForm(c, function () { return { origem: c.dataset.origem, plano: escolhido }; });
    });
  }

  /* ---------- diagnóstico ---------- */
  var perguntas = [
    { t: "Qual é o seu caso?", o: [["mei", "Sou MEI"], ["me", "Tenho microempresa (ME ou EPP)"], ["auto", "Sou autônomo, sem CNPJ"], ["abrir", "Quero abrir uma empresa"]] },
    { t: "Quanto você fatura por mês, em média?", o: [["0", "Até R$ 6.750"], ["1", "De R$ 6.750 a R$ 30 mil"], ["2", "Acima de R$ 30 mil"], ["3", "Ainda não faturo"]] },
    { t: "O que mais te incomoda hoje?", o: [["das", "Imposto ou boleto atrasado"], ["nf", "Emitir nota fiscal"], ["cnpj", "Abrir ou regularizar o CNPJ"], ["fin", "Organizar as finanças"]] }
  ];
  var ROT_CASO = { mei: "MEI", me: "Microempresa", auto: "Autônomo", abrir: "Quer abrir empresa" };
  var ROT_FAT = ["até R$ 6.750", "R$ 6.750 a 30 mil", "acima de R$ 30 mil", "ainda não fatura"];
  var ROT_DOR = { das: "imposto atrasado", nf: "nota fiscal", cnpj: "abrir ou regularizar CNPJ", fin: "organizar finanças" };
  var PRIMEIRO = { das: "Começo levantando o que está em aberto e te mostro como regularizar.", nf: "Começo configurando a emissão de nota para você emitir sem erro.", cnpj: "Começo conferindo a atividade e a situação do CNPJ, ou abrindo o seu.", fin: "Começo separando as contas da empresa e as pessoais, com um controle simples." };
  var quiz = { passo: 0, resp: [] };
  function recomenda(r) { var fat = Number(r[1]); return fat === 2 ? "cresce" : (r[0] === "me" || fat === 1) ? "simples" : "mei"; }
  function desenharQuiz() {
    var box = $("#quiz");
    if (quiz.passo < perguntas.length) {
      var q = perguntas[quiz.passo];
      box.innerHTML = '<div class="quiz-prog" aria-hidden="true">' + perguntas.map(function (x, i) { return '<i class="' + (i <= quiz.passo ? "ok" : "") + '"></i>'; }).join("") + "</div><h3>" + esc(q.t) + '</h3><div class="opcoes">' +
        q.o.map(function (o) { return '<button class="opcao" data-v="' + o[0] + '" type="button">' + esc(o[1]) + "</button>"; }).join("") + "</div>" +
        (quiz.passo ? '<p style="margin:var(--e2) 0 0"><button class="btn btn-contorno btn-pequeno" data-voltar type="button">Voltar</button></p>' : "");
      return;
    }
    var id = recomenda(quiz.resp), p = plano(id);
    var resumo = "Diagnóstico: " + ROT_CASO[quiz.resp[0]] + " · fatura " + ROT_FAT[Number(quiz.resp[1])] + " · dor: " + ROT_DOR[quiz.resp[2]] + " · plano sugerido: " + p.nome + ".";
    box.innerHTML = '<div class="resultado"><p class="sobretitulo" style="color:var(--menta)">Recomendação para você</p><h3>' + esc(p.nome) + '</h3><p class="preco">' + brl(p.preco) + '<small style="font-size:1rem;color:#c9d3f5;font-weight:500">/mês</small></p><p>' + esc(PRIMEIRO[quiz.resp[2]]) + "</p><ul style=\"padding-left:20px\">" +
      p.itens.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + '</ul></div><div class="cartao-lead" style="margin-top:var(--e3);box-shadow:none;border:1px solid var(--borda-suave)"><h2>Quero falar sobre isso</h2><p>Deixe seu WhatsApp e eu te chamo.</p><div id="quiz-form"></div></div>' +
      '<p style="margin:var(--e2) 0 0"><button class="btn btn-contorno btn-pequeno" data-refazer type="button">Refazer o diagnóstico</button></p>';
    var c = $("#quiz-form"); c.innerHTML = formHtml("Receber meu retorno");
    ligarForm(c, { origem: "quiz", plano: id, obs: resumo });
    evento("quiz_complete", { plano: id });
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("button, a"); if (!b) return;
    if (b.dataset.v !== undefined && b.classList.contains("opcao")) { quiz.resp[quiz.passo] = b.dataset.v; quiz.passo++; desenharQuiz(); }
    else if ("voltar" in b.dataset) { quiz.passo = Math.max(0, quiz.passo - 1); desenharQuiz(); }
    else if ("refazer" in b.dataset) { quiz = { passo: 0, resp: [] }; desenharQuiz(); }
    else if (b.dataset.plano) escolhido = b.dataset.plano;
  });

  montar(); formularios(); desenharQuiz();
})();
