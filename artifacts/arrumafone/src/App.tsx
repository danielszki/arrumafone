import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowRight,
  BatteryCharging,
  Check,
  ChevronDown,
  Clock3,
  House,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Phone,
  ShieldCheck,
  Smartphone,
  Star,
  Usb,
  X,
} from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();
const WHATSAPP_URL = 'https://wa.me/5511976107921';
const PHONE_LABEL = '(11) 97610-7921';
const ADDRESS = 'Rua Julio Rebollo Perez, 322 — São Paulo, SP';

function updateMeta(path: string) {
  const isAssessment = path === '/avaliacao';
  const title = isAssessment
    ? 'Avaliação de conserto de celular | ArrumaFone'
    : 'Conserto de celular em domicílio em São Paulo | ArrumaFone';
  const description = isAssessment
    ? 'Conte o que aconteceu com seu celular e receba uma avaliação rápida da ArrumaFone direto pelo WhatsApp.'
    : 'Conserto de celular em domicílio em São Paulo. Troca de tela, bateria e conector USB com técnico de confiança, no conforto da sua casa.';
  const base = (import.meta.env.VITE_PUBLIC_SITE_URL || window.location.origin).replace(/\/$/, '');
  const url = `${base}${isAssessment ? '/avaliacao' : '/'}`;
  document.title = title;
  const set = (selector: string, value: string, attr = 'content') => {
    const node = document.querySelector(selector);
    if (node) node.setAttribute(attr, value);
  };
  set('meta[name="description"]', description);
  set('link[rel="canonical"]', url, 'href');
  set('meta[property="og:title"]', title);
  set('meta[property="og:description"]', description);
  set('meta[property="og:url"]', url);
  set('meta[name="twitter:title"]', title);
  set('meta[name="twitter:description"]', description);
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3" data-testid="brand-arrumafone">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#57ddd0]/50 bg-[#153c46] shadow-[0_0_0_4px_rgba(84,216,204,.06)]">
        <Smartphone size={20} strokeWidth={2.3} className="text-[#71e5d7]" />
        <span className="absolute bottom-[7px] h-1 w-1 rounded-full bg-[#f6bd73]" />
      </span>
      {!compact && (
        <span className="font-display text-[18px] font-bold tracking-[-.04em] text-[#f1f8f6]">
          Arruma<span className="text-[#62ddd1]">Fone</span>
        </span>
      )}
    </span>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="relative z-30 border-b border-white/[.07] bg-[#0e1a2b]/90 backdrop-blur-md">
      <div className="container-narrow flex h-[76px] items-center justify-between">
        <Link href="/" className="no-underline" data-testid="link-logo-home">
          <BrandMark />
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          <a href="#servicos" className="text-[13px] font-semibold text-[#a1b3bc] transition-colors hover:text-[#70e0d2]" data-testid="link-services">Serviços</a>
          <a href="#como-funciona" className="text-[13px] font-semibold text-[#a1b3bc] transition-colors hover:text-[#70e0d2]" data-testid="link-how-it-works">Como funciona</a>
          <a href="#depoimentos" className="text-[13px] font-semibold text-[#a1b3bc] transition-colors hover:text-[#70e0d2]" data-testid="link-reviews">Avaliações</a>
          <a href="#duvidas" className="text-[13px] font-semibold text-[#a1b3bc] transition-colors hover:text-[#70e0d2]" data-testid="link-faq">Dúvidas</a>
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <a href={`tel:+5511976107921`} className="flex items-center gap-2 text-[13px] font-semibold text-[#a1b3bc] hover:text-[#f1f8f6]" data-testid="link-phone-header">
            <Phone size={15} /> {PHONE_LABEL}
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="shine-button flex items-center gap-2 rounded-full bg-[#62ddd1] px-5 py-3 text-[12px] font-bold text-[#0e1a2b]" data-testid="link-whatsapp-header">
            <MessageCircle size={15} /> Falar com a gente
          </a>
        </div>
        <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-[#d8ebe8] md:hidden" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} data-testid="button-mobile-menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="border-t border-white/[.07] bg-[#111f31] px-5 py-5 md:hidden" aria-label="Menu mobile">
          <div className="container-narrow flex flex-col gap-5">
            <a href="#servicos" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-[#b4c7cc]" data-testid="mobile-link-services">Serviços</a>
            <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-[#b4c7cc]" data-testid="mobile-link-how">Como funciona</a>
            <a href="#depoimentos" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-[#b4c7cc]" data-testid="mobile-link-reviews">Avaliações</a>
            <a href="#duvidas" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-[#b4c7cc]" data-testid="mobile-link-faq">Dúvidas</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex w-fit items-center gap-2 rounded-full bg-[#62ddd1] px-5 py-3 text-sm font-bold text-[#0e1a2b]" data-testid="mobile-link-whatsapp">Falar pelo WhatsApp <ArrowRight size={15} /></a>
          </div>
        </nav>
      )}
    </header>
  );
}

function PhoneIllustration() {
  return (
    <div className="relative mx-auto h-[410px] w-[350px] sm:h-[470px] sm:w-[420px]" aria-label="Ilustração de um celular sendo cuidado por um técnico">
      <div className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5edbd1]/20 bg-[#183245] shadow-[0_0_0_20px_rgba(84,216,204,.025),0_0_70px_rgba(84,216,204,.11)] sm:h-[370px] sm:w-[370px]" />
      <div className="orbit absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#60c9c1]/25 sm:h-[420px] sm:w-[420px]">
        <span className="absolute -right-1 top-1/2 h-3 w-3 rounded-full bg-[#f5bc72] shadow-[0_0_0_7px_rgba(245,188,114,.1)]" />
        <span className="absolute -left-1 top-1/4 h-2 w-2 rounded-full bg-[#5edbd1]" />
      </div>
      <div className="phone-float device-shadow absolute left-1/2 top-1/2 h-[278px] w-[143px] -translate-x-1/2 -translate-y-1/2 rotate-[4deg] rounded-[29px] border-[5px] border-[#7e969b] bg-[#081522] p-[6px]">
        <div className="relative h-full overflow-hidden rounded-[20px] bg-[linear-gradient(155deg,#234d58,#0c2635_60%,#15202e)]">
          <div className="absolute left-1/2 top-2 h-5 w-14 -translate-x-1/2 rounded-full bg-[#07121e]" />
          <div className="absolute inset-x-5 top-[72px] h-20 rounded-2xl border border-[#73d9ce]/20 bg-[#74d9cf]/10">
            <div className="absolute left-4 top-4 h-6 w-6 rounded-full border border-[#74d9cf]/60" />
            <div className="absolute bottom-4 left-4 h-1.5 w-20 rounded-full bg-[#83e2d8]/60" />
            <div className="absolute bottom-2 left-4 h-1 w-11 rounded-full bg-[#83e2d8]/30" />
          </div>
          <div className="absolute bottom-7 left-5 right-5 flex justify-between">
            <span className="h-8 w-8 rounded-xl bg-[#f5bc72]/90" />
            <span className="h-8 w-8 rounded-xl border border-[#78d9d1]/50" />
            <span className="h-8 w-8 rounded-xl bg-[#78d9d1]/50" />
          </div>
        </div>
      </div>
      <div className="absolute left-1 top-[92px] flex items-center gap-2 rounded-xl border border-[#77e0d3]/20 bg-[#19394a]/90 px-3 py-2 shadow-xl backdrop-blur">
        <ShieldCheck size={16} className="text-[#72e1d5]" />
        <span className="text-[10px] font-bold text-[#d3ebe7]">Cuidado de verdade</span>
      </div>
      <div className="absolute bottom-[52px] right-0 flex items-center gap-2 rounded-xl border border-[#f5bc72]/20 bg-[#263344]/95 px-3 py-2 shadow-xl backdrop-blur">
        <Clock3 size={15} className="text-[#f5bc72]" />
        <span className="text-[10px] font-bold text-[#d3ebe7]">No seu tempo</span>
      </div>
    </div>
  );
}

const services = [
  { icon: MonitorSmartphone, title: 'Troca de tela', copy: 'Seu aparelho de volta à vida, com toque preciso e acabamento caprichado.', tag: 'Mais procurado' },
  { icon: BatteryCharging, title: 'Troca de bateria', copy: 'Mais autonomia para o seu dia, sem depender da tomada a todo instante.', tag: 'Dia a dia' },
  { icon: Usb, title: 'Conector USB', copy: 'Carga e conexão confiáveis para você parar de procurar a posição certa.', tag: 'Diagnóstico' },
];

function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) {
  const Icon = service.icon;
  return (
    <article className={`group relative overflow-hidden rounded-[22px] border border-[#2a4650] bg-[#132638] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#58d8cd]/60 hover:bg-[#173143] ${index === 1 ? 'md:mt-10' : ''}`} data-testid={`card-service-${index}`}>
      <div className="mb-10 flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1d4550] text-[#6be1d5] transition-transform group-hover:rotate-[-6deg]"><Icon size={22} /></span>
        <span className="rounded-full border border-[#35535a] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#8faeb0]">{service.tag}</span>
      </div>
      <h3 className="font-display text-[22px] font-bold tracking-[-.03em] text-[#eff8f4]">{service.title}</h3>
      <p className="mt-3 max-w-[270px] text-[14px] leading-6 text-[#9eb7ba]">{service.copy}</p>
      <Link href="/avaliacao" className="mt-8 flex w-fit items-center gap-2 text-[12px] font-bold text-[#66dcd1]" data-testid={`link-service-assessment-${index}`}>Quero resolver <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
      <span className="absolute -bottom-12 -right-8 h-32 w-32 rounded-full border border-[#65d8cf]/10" />
    </article>
  );
}

function Home() {
  useEffect(() => { updateMeta('/'); }, []);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs = [
    ['Vocês atendem em quais regiões?', 'Atendemos São Paulo e regiões próximas. Envie seu endereço pelo WhatsApp para confirmarmos a disponibilidade e o deslocamento.'],
    ['Quanto tempo leva o reparo?', 'O tempo depende do modelo e do serviço. Na avaliação, informamos a previsão antes de começar — sem surpresa no meio do caminho.'],
    ['A peça tem garantia?', 'Sim. Usamos peças selecionadas e explicamos a cobertura da garantia do serviço no orçamento.'],
    ['O atendimento é realmente em casa?', 'Sim. Combinamos o melhor horário e levamos as ferramentas necessárias até você. Em alguns casos, indicamos a retirada segura do aparelho.'],
    ['Como faço para pedir um orçamento?', 'Preencha a avaliação rápida ou chame no WhatsApp. Uma pessoa da equipe responde com os próximos passos.'],
    ['Vocês mexem em iPhone e Android?', 'Atendemos os principais modelos de iPhone e Android. Informe o modelo exato para avaliarmos a peça correta.'],
  ];
  return (
    <div className="site-shell noise min-h-[100dvh]">
      <SiteHeader />
      <main>
        <section className="relative grid-lines">
          <div className="container-narrow grid min-h-[650px] items-center gap-8 pb-16 pt-14 md:grid-cols-[1.05fr_.95fr] md:pb-20 md:pt-20">
            <div className="reveal relative z-10">
              <div className="eyebrow mb-6 flex items-center gap-3"><span className="h-px w-8 bg-[#5edbd1]" /> Assistência que vai até você</div>
              <h1 className="font-display max-w-[650px] text-[45px] font-bold leading-[.98] tracking-[-.065em] text-[#f0f8f5] sm:text-[62px] lg:text-[76px]">Seu celular consertado.<br /><span className="text-[#62ddd1]">Sem sair de casa.</span></h1>
              <p className="mt-7 max-w-[475px] text-[17px] leading-7 text-[#a9bec1]">Tela quebrada, bateria que não dura ou conector falhando? Um técnico de confiança resolve com cuidado, no seu endereço, em São Paulo.</p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link href="/avaliacao" className="shine-button flex items-center gap-3 rounded-full bg-[#62ddd1] px-6 py-4 text-[13px] font-bold text-[#0e1a2b]" data-testid="link-start-assessment">Avaliar meu aparelho <ArrowRight size={17} /></Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-3 text-[13px] font-bold text-[#d3e6e3] transition-colors hover:text-[#62ddd1]" data-testid="link-hero-whatsapp"><MessageCircle size={16} className="text-[#62ddd1]" /> Falar pelo WhatsApp</a>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] font-semibold text-[#789599]">
                <span className="flex items-center gap-2"><Check size={14} className="text-[#62ddd1]" /> Orçamento antes do reparo</span>
                <span className="flex items-center gap-2"><Check size={14} className="text-[#62ddd1]" /> Atendimento com hora marcada</span>
              </div>
            </div>
            <div className="reveal reveal-delay-2 relative z-10 md:pl-4"><PhoneIllustration /></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0e1a2b] to-transparent" />
        </section>

        <section className="relative bg-[#0e1a2b] pb-24 pt-8" id="servicos">
          <div className="container-narrow">
            <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div><p className="eyebrow mb-4">O que a gente resolve</p><h2 className="font-display max-w-[560px] text-[35px] font-bold leading-[1.05] tracking-[-.05em] text-[#eef8f4] sm:text-[46px]">Problema no celular não precisa parar seu dia.</h2></div>
              <p className="max-w-[260px] text-[13px] leading-5 text-[#8ea7aa]">Diagnóstico claro, peça adequada e um cuidado que você percebe no primeiro contato.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">{services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} />)}</div>
          </div>
        </section>

        <section className="border-y border-[#263b47] bg-[#132638] py-7">
          <div className="container-narrow grid gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1c4652] text-[#62ddd1]"><House size={19} /></span><div><p className="text-[12px] font-bold text-[#e1f0ed]">Atendimento em domicílio</p><p className="mt-1 text-[11px] text-[#8eaaad]">São Paulo e região</p></div></div>
            <div className="flex items-center gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1c4652] text-[#62ddd1]"><ShieldCheck size={19} /></span><div><p className="text-[12px] font-bold text-[#e1f0ed]">Transparência do começo ao fim</p><p className="mt-1 text-[11px] text-[#8eaaad]">Você aprova antes de reparar</p></div></div>
            <div className="flex items-center gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3f3c33] text-[#f5bc72]"><Clock3 size={19} /></span><div><p className="text-[12px] font-bold text-[#e1f0ed]">Agilidade de verdade</p><p className="mt-1 text-[11px] text-[#8eaaad]">Horários que cabem na sua rotina</p></div></div>
          </div>
        </section>

        <section className="bg-[#101e2e] py-24" id="como-funciona">
          <div className="container-narrow">
            <div className="grid gap-14 md:grid-cols-[.8fr_1.2fr]">
              <div><p className="eyebrow mb-5">Como funciona</p><h2 className="font-display text-[38px] font-bold leading-[1.03] tracking-[-.05em] text-[#eff8f4] sm:text-[51px]">Você chama.<br /><span className="text-[#62ddd1]">A gente cuida.</span></h2><p className="mt-6 max-w-[340px] text-[15px] leading-7 text-[#91aaad]">Um processo simples para você não perder tempo, nem ficar com dúvidas.</p><Link href="/avaliacao" className="mt-8 inline-flex items-center gap-2 text-[13px] font-bold text-[#62ddd1]" data-testid="link-how-assessment">Começar avaliação <ArrowRight size={15} /></Link></div>
              <div className="relative">
                <div className="absolute bottom-10 left-[21px] top-10 w-px bg-gradient-to-b from-[#5edbd1] via-[#5edbd1]/30 to-transparent" />
                {[['01', 'Conte o que aconteceu', 'Preencha uma avaliação rápida com o modelo e o problema do aparelho.'], ['02', 'A gente combina o melhor horário', 'Conversamos pelo WhatsApp, confirmamos a região e explicamos as opções.'], ['03', 'Seu celular volta a funcionar', 'O técnico vai até você com as ferramentas e o cuidado necessários.']].map(([number, title, copy]) => (
                  <div key={number} className="relative mb-9 flex gap-7 last:mb-0" data-testid={`step-${number}`}>
                    <span className="relative z-10 flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full border border-[#5edbd1]/50 bg-[#122638] font-display text-[12px] font-bold text-[#62ddd1]">{number}</span>
                    <div className="pt-1"><h3 className="font-display text-[20px] font-bold tracking-[-.03em] text-[#edf8f4]">{title}</h3><p className="mt-2 max-w-[360px] text-[14px] leading-6 text-[#8ea7aa]">{copy}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#d4e7df] py-16 text-[#132536]" aria-label="Área de atendimento">
          <div className="container-narrow grid items-center gap-10 md:grid-cols-[1fr_1.15fr]">
            <div><p className="eyebrow !text-[#177d78]">Onde atendemos</p><h2 className="mt-4 font-display text-[36px] font-bold leading-[1.04] tracking-[-.05em] sm:text-[48px]">Perto de você,<br />quando precisar.</h2><p className="mt-5 max-w-[390px] text-[15px] leading-7 text-[#4c6b6d]">Nossa base fica em São Paulo. Envie seu bairro e endereço para confirmarmos a disponibilidade do atendimento em domicílio.</p><div className="mt-7 flex items-start gap-3 text-[13px] font-bold text-[#255355]"><MapPin size={19} className="mt-0.5 text-[#178e86]" /><span>{ADDRESS}<br /><small className="font-normal text-[#6b8584]">Atendimento com hora marcada</small></span></div></div>
            <div className="relative h-[270px] overflow-hidden rounded-[24px] border border-[#a9cbc3] bg-[#bddbd2]" data-testid="map-area">
              <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(35deg, transparent 45%, #8ebdb5 46%, #8ebdb5 47%, transparent 48%), linear-gradient(125deg, transparent 42%, #8ebdb5 43%, #8ebdb5 44%, transparent 45%), linear-gradient(90deg, transparent 49%, #98c5bc 50%, transparent 51%)', backgroundSize: '150px 110px, 180px 140px, 90px 90px' }} />
              <div className="absolute left-[25%] top-[37%] h-28 w-28 rounded-full border border-[#69ada4]/45" /><div className="absolute left-[25%] top-[37%] h-28 w-28 scale-[1.65] rounded-full border border-[#69ada4]/25" />
              <div className="absolute left-[47%] top-[39%] flex h-12 w-12 items-center justify-center rounded-full bg-[#123545] text-[#68dfd2] shadow-xl"><MapPin size={21} /></div>
              <div className="absolute bottom-4 left-4 rounded-lg bg-[#e3f0e9]/90 px-3 py-2 text-[10px] font-bold text-[#375c5d] shadow-sm">São Paulo · atendimento local</div>
            </div>
          </div>
        </section>

        <section className="bg-[#0e1a2b] py-24" id="depoimentos">
          <div className="container-narrow">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow mb-4">Quem já chamou</p><h2 className="font-display text-[37px] font-bold tracking-[-.05em] text-[#eff8f4] sm:text-[49px]">Cuidado que dá<br /><span className="text-[#62ddd1]">para recomendar.</span></h2></div><div className="flex items-center gap-2 text-[#f5bc72]"><Star size={17} fill="currentColor" /><span className="font-display text-[19px] font-bold">4,9</span><span className="text-[12px] text-[#91aaad]">na avaliação dos clientes</span></div></div>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[['“Chegaram no horário e explicaram tudo sem pressa. A tela ficou impecável e eu não precisei atravessar a cidade.”', 'Marina A.', 'Vila Mariana'], ['“Meu celular não carregava direito há semanas. Resolveram no mesmo dia e ainda me orientaram sobre os cuidados.”', 'Rafael M.', 'Mooca'], ['“O atendimento em casa fez toda diferença. Orçamento claro e o técnico foi muito cuidadoso com o aparelho.”', 'Camila R.', 'Pinheiros']].map(([quote, name, place], index) => <article key={name} className="rounded-[20px] border border-[#263f4b] bg-[#142536] p-6" data-testid={`review-${index}`}><div className="mb-7 flex gap-1 text-[#f5bc72]">{[1, 2, 3, 4, 5].map(star => <Star key={star} size={13} fill="currentColor" />)}</div><p className="min-h-[105px] text-[14px] leading-6 text-[#d1e1de]">{quote}</p><div className="mt-7 flex items-center gap-3 border-t border-[#28434b] pt-5"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#28515a] font-display text-[11px] font-bold text-[#73dfd4]">{name.split(' ').map(part => part[0]).join('')}</span><div><p className="text-[12px] font-bold text-[#e4f1ed]">{name}</p><p className="text-[11px] text-[#7e9b9e]">{place}, São Paulo</p></div></div></article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#101e2e] py-24" id="duvidas">
          <div className="container-narrow grid gap-12 md:grid-cols-[.7fr_1.3fr]">
            <div><p className="eyebrow mb-5">Ainda com dúvida?</p><h2 className="font-display text-[37px] font-bold leading-[1.04] tracking-[-.05em] text-[#eff8f4] sm:text-[49px]">A resposta pode estar aqui.</h2><p className="mt-5 max-w-[300px] text-[14px] leading-6 text-[#8ea7aa]">Se não estiver, é só chamar no WhatsApp. A gente responde de verdade.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#4bbcb5] px-5 py-3 text-[12px] font-bold text-[#69ddd3] hover:bg-[#183943]" data-testid="link-faq-whatsapp">Tirar dúvida no WhatsApp <ArrowRight size={15} /></a></div>
            <div className="divide-y divide-[#29414c] border-y border-[#29414c]">{faqs.map(([question, answer], index) => <div key={question} data-testid={`faq-item-${index}`}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left" data-testid={`button-faq-${index}`}><span className="text-[14px] font-semibold text-[#d9e9e5]">{question}</span><ChevronDown size={17} className={`shrink-0 text-[#62ddd1] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <p className="accordion-copy -mt-2 max-w-[650px] pb-5 pr-8 text-[13px] leading-6 text-[#8ea7aa]">{answer}</p>}</div>)}</div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#62cfc4] py-20 text-[#102432]">
          <div className="container-narrow relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="font-display text-[11px] font-bold uppercase tracking-[.2em] text-[#246c6d]">Seu próximo passo</p><h2 className="mt-3 max-w-[650px] font-display text-[38px] font-bold leading-[1.02] tracking-[-.05em] sm:text-[54px]">Seu celular merece<br />um cuidado melhor.</h2></div><Link href="/avaliacao" className="shine-button flex shrink-0 items-center gap-3 rounded-full bg-[#102432] px-6 py-4 text-[13px] font-bold text-[#e4f5ef]" data-testid="link-bottom-assessment">Fazer avaliação gratuita <ArrowRight size={17} /></Link></div>
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[34px] border-[#8ee7dc]/40" />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  return <footer className="bg-[#091521] py-10"><div className="container-narrow flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><div><Link href="/" data-testid="link-footer-home"><BrandMark /></Link><p className="mt-4 max-w-[270px] text-[12px] leading-5 text-[#718b91]">Conserto de celular em domicílio, com transparência e cuidado em São Paulo.</p></div><div className="flex flex-col items-start gap-4 sm:items-end"><div className="flex items-center gap-4"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Falar com a ArrumaFone no WhatsApp" className="text-[#8ba7aa] hover:text-[#62ddd1]" data-testid="link-footer-whatsapp"><MessageCircle size={17} /></a><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram da ArrumaFone" className="text-[#8ba7aa] hover:text-[#62ddd1]" data-testid="link-footer-instagram"><Instagram size={17} /></a><a href={`tel:+5511976107921`} aria-label="Ligar para a ArrumaFone" className="text-[#8ba7aa] hover:text-[#62ddd1]" data-testid="link-footer-phone"><Phone size={17} /></a></div><p className="text-[11px] text-[#607a80]">© 2024 ArrumaFone · São Paulo, SP</p></div></div></footer>;
}

type AssessmentFields = { name: string; phone: string; model: string; problem: string; preference: string; notes: string };

function Assessment() {
  useEffect(() => { updateMeta('/avaliacao'); }, []);
  const [fields, setFields] = useState<AssessmentFields>({ name: '', phone: '', model: '', problem: '', preference: 'Em casa', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const problems = ['Tela quebrada', 'Bateria ruim', 'Conector USB', 'Outro problema'];
  const setField = (key: keyof AssessmentFields, value: string) => setFields(current => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fields.name.trim() || !fields.phone.trim() || !fields.model.trim() || !fields.problem) {
      setError('Preencha nome, telefone, modelo e problema para continuar.');
      return;
    }
    setError('');
    const message = `Olá, ArrumaFone! Quero avaliar meu aparelho.%0A%0ANome: ${encodeURIComponent(fields.name)}%0ATelefone: ${encodeURIComponent(fields.phone)}%0AModelo: ${encodeURIComponent(fields.model)}%0AProblema: ${encodeURIComponent(fields.problem)}%0APreferência: ${encodeURIComponent(fields.preference)}%0AObservações: ${encodeURIComponent(fields.notes || 'Não informado')}`;
    setSubmitted(true);
    window.open(`${WHATSAPP_URL}?text=${message}`, '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="site-shell noise min-h-[100dvh]">
      <header className="border-b border-white/[.07] bg-[#0e1a2b]/90">
        <div className="container-narrow flex h-[76px] items-center justify-between"><Link href="/" data-testid="link-assessment-logo"><BrandMark /></Link><Link href="/" className="flex items-center gap-2 text-[13px] font-semibold text-[#a5b9bc] hover:text-[#62ddd1]" data-testid="link-back-home"><ArrowRight size={15} className="rotate-180" /> Voltar para o início</Link></div>
      </header>
      <main className="grid-lines">
        <section className="container-narrow pb-20 pt-16 sm:pb-28 sm:pt-24">
          <div className="mx-auto max-w-[760px] text-center"><p className="eyebrow mb-6">Avaliação sem compromisso</p><h1 className="font-display text-[42px] font-bold leading-[.99] tracking-[-.06em] text-[#f0f8f5] sm:text-[64px]">Vamos entender o que<br /><span className="text-[#62ddd1]">seu celular precisa.</span></h1><p className="mx-auto mt-6 max-w-[520px] text-[16px] leading-7 text-[#9fb8ba]">Conte os detalhes abaixo. A avaliação é rápida e nossa equipe continua o atendimento pelo WhatsApp.</p></div>
          <div className="mx-auto mt-14 max-w-[760px] rounded-[26px] border border-[#2a4550] bg-[#122336] p-5 shadow-[0_22px_65px_rgba(1,9,18,.25)] sm:p-9">
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#5edbd1] text-[#0e1a2b]"><Check size={30} /></span><h2 className="mt-7 font-display text-[30px] font-bold tracking-[-.04em] text-[#eff8f4]">Avaliação enviada.</h2><p className="mt-3 max-w-[390px] text-[14px] leading-6 text-[#9fb8ba]">Abrimos o WhatsApp com tudo preenchido. É só enviar a mensagem para a equipe da ArrumaFone continuar com você.</p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="shine-button mt-8 flex items-center gap-2 rounded-full bg-[#62ddd1] px-6 py-3.5 text-[13px] font-bold text-[#0e1a2b]" data-testid="link-confirmation-whatsapp"><MessageCircle size={16} /> Abrir WhatsApp novamente</a><button type="button" onClick={() => setSubmitted(false)} className="mt-5 text-[12px] font-semibold text-[#7fa0a1] hover:text-[#62ddd1]" data-testid="button-edit-assessment">Editar avaliação</button></div>
            ) : (
              <form onSubmit={submit} noValidate data-testid="form-assessment">
                <div className="mb-8 flex items-center justify-between border-b border-[#29434d] pb-5"><div><p className="eyebrow !text-[10px]">Passo único</p><p className="mt-2 font-display text-[19px] font-bold text-[#e9f5f1]">Fale um pouco sobre o aparelho</p></div><span className="rounded-full bg-[#1b3e49] px-3 py-1.5 text-[11px] font-bold text-[#69ddd3]">1 / 1</span></div>
                {error && <div role="alert" className="mb-6 rounded-xl border border-[#b96b63]/50 bg-[#4b2529]/40 px-4 py-3 text-[13px] text-[#f2aaa0]" data-testid="status-form-error">{error}</div>}
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block"><span className="mb-2 block text-[12px] font-bold text-[#bfd4d2]">Seu nome *</span><input value={fields.name} onChange={event => setField('name', event.target.value)} placeholder="Como podemos chamar você?" className="form-input" data-testid="input-name" /></label>
                  <label className="block"><span className="mb-2 block text-[12px] font-bold text-[#bfd4d2]">Telefone / WhatsApp *</span><input value={fields.phone} onChange={event => setField('phone', event.target.value)} type="tel" placeholder="(11) 99999-9999" className="form-input" data-testid="input-phone" /></label>
                </div>
                <label className="mt-5 block"><span className="mb-2 block text-[12px] font-bold text-[#bfd4d2]">Qual é o modelo do aparelho? *</span><input value={fields.model} onChange={event => setField('model', event.target.value)} placeholder="Ex.: iPhone 12, Galaxy S22..." className="form-input" data-testid="input-model" /></label>
                <fieldset className="mt-6"><legend className="mb-3 text-[12px] font-bold text-[#bfd4d2]">O que aconteceu? *</legend><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{problems.map(problem => <button type="button" key={problem} onClick={() => setField('problem', problem)} className={`rounded-xl border px-3 py-3 text-left text-[12px] font-semibold transition-colors ${fields.problem === problem ? 'border-[#62ddd1] bg-[#1b4a50] text-[#76e4d9]' : 'border-[#2d4a53] bg-[#172c3d] text-[#9eb7ba] hover:border-[#548f91]'}`} data-testid={`button-problem-${problem.toLowerCase().replaceAll(' ', '-')}`}>{problem}</button>)}</div></fieldset>
                <fieldset className="mt-6"><legend className="mb-3 text-[12px] font-bold text-[#bfd4d2]">Como você prefere ser atendido?</legend><div className="grid gap-2 sm:grid-cols-2">{['Em casa', 'Combinar pelo WhatsApp'].map(preference => <button type="button" key={preference} onClick={() => setField('preference', preference)} className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[12px] font-semibold transition-colors ${fields.preference === preference ? 'border-[#62ddd1] bg-[#1b4a50] text-[#76e4d9]' : 'border-[#2d4a53] bg-[#172c3d] text-[#9eb7ba] hover:border-[#548f91]'}`} data-testid={`button-preference-${preference === 'Em casa' ? 'home' : 'whatsapp'}`}><span className={`h-3 w-3 rounded-full border ${fields.preference === preference ? 'border-[4px] border-[#62ddd1]' : 'border-[#78979a]'}`} />{preference}</button>)}</div></fieldset>
                <label className="mt-6 block"><span className="mb-2 block text-[12px] font-bold text-[#bfd4d2]">Alguma observação?</span><textarea value={fields.notes} onChange={event => setField('notes', event.target.value)} placeholder="Quando começou, se o aparelho liga, detalhes importantes..." className="form-input min-h-[105px] resize-y" data-testid="input-notes" /></label>
                <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-[#29434d] pt-6 sm:flex-row sm:items-center"><p className="flex max-w-[330px] gap-2 text-[11px] leading-5 text-[#7f9b9e]"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#62ddd1]" /> Seus dados são usados apenas para responder sua solicitação.</p><button type="submit" className="shine-button flex w-full items-center justify-center gap-2 rounded-full bg-[#62ddd1] px-6 py-4 text-[13px] font-bold text-[#0e1a2b] sm:w-auto" data-testid="button-submit-assessment">Enviar avaliação <ArrowRight size={16} /></button></div>
              </form>
            )}
          </div>
        </section>
      </main>
      <footer className="border-t border-[#223946] bg-[#091521] py-7"><div className="container-narrow flex flex-col justify-between gap-3 text-[11px] text-[#718b91] sm:flex-row"><span>ArrumaFone · Assistência em domicílio</span><span>{PHONE_LABEL} · São Paulo, SP</span></div></footer>
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  useEffect(() => { updateMeta(location); }, [location]);
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route path="/avaliacao" component={Assessment} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;