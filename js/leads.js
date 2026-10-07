/* Contatos captados. Na amostra ficam no navegador (localStorage);
   em produção, esta camada envia para um banco, planilha ou CRM. */
window.Leads = (function () {
  "use strict";
  var K = "lp-leads:v1";
  function ler() { try { var v = JSON.parse(localStorage.getItem(K)); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function gravar(l) { try { localStorage.setItem(K, JSON.stringify(l)); } catch (e) {} }
  var STATUS = ["novo", "contatado", "reuniao", "proposta", "cliente", "perdido"];
  var ROTULO = { novo: "Novo", contatado: "Contatado", reuniao: "Reunião marcada", proposta: "Proposta enviada", cliente: "Virou cliente", perdido: "Perdido" };
  var api = {
    STATUS: STATUS, ROTULO: ROTULO,
    lista: ler,
    add: function (l) {
      var a = ler(); l.id = a.reduce(function (m, x) { return Math.max(m, x.id); }, 0) + 1;
      l.status = "novo"; l.hora = new Date().toISOString(); a.push(l); gravar(a); return l;
    },
    status: function (id, s) { var a = ler(); a.forEach(function (x) { if (x.id === id) x.status = s; }); gravar(a); },
    remover: function (id) { gravar(ler().filter(function (x) { return x.id !== id; })); },
    limpar: function () { try { localStorage.removeItem(K); } catch (e) {} },
    exemplo: function () {
      [["Fábio Nogueira", "11977770001", "quiz", "Perfil: MEI · fatura até R$ 6.750 · dor: DAS atrasado", "novo", "mei"],
       ["Juliana Prado", "11977770002", "quiz", "Perfil: Microempresa · fatura R$ 6.750 a 30 mil · dor: nota fiscal", "contatado", "simples"],
       ["Marcelo Antunes", "11977770003", "formulario", "Quer trocar de contador", "reuniao", "simples"],
       ["Patrícia Souza", "11977770004", "quiz", "Perfil: quer abrir empresa · fatura ainda não fatura", "cliente", "mei"],
       ["Lucas Ferraz", "11977770005", "whatsapp", "", "perdido", ""]].forEach(function (n) {
        var l = api.add({ nome: n[0], tel: n[1], origem: n[2], obs: n[3], plano: n[5] }); api.status(l.id, n[4]);
      });
    },
    aoMudar: function (fn) { window.addEventListener("storage", function (e) { if (!e.key || e.key === K) fn(); }); }
  };
  return api;
})();
