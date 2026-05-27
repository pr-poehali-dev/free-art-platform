import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';

// ─── Data ────────────────────────────────────────────────────────────────────

const POEMS = [
  {
    id: 1,
    title: 'Осенний свет',
    date: 'Октябрь 2024',
    tags: ['осень', 'природа'],
    preview: 'Когда листва горит в руках у ветра,\nИ небо стало холоднее льда,\nЯ вспоминаю тихий вечер где-то,\nКуда нельзя вернуться никогда.',
    full: 'Когда листва горит в руках у ветра,\nИ небо стало холоднее льда,\nЯ вспоминаю тихий вечер где-то,\nКуда нельзя вернуться никогда.\n\nЗолотистый дым над полем стелется,\nПтицы тянутся в далёкий юг.\nЧто-то в воздухе такое делается —\nНе обнять, не удержать, не вдруг.',
  },
  {
    id: 2,
    title: 'Тишина',
    date: 'Март 2025',
    tags: ['медитация', 'покой'],
    preview: 'Тишина бывает разной:\nГромкой, нежной, безотказной.\nТа, что после ссоры — лёд.\nТа, что перед рассветом — мёд.',
    full: 'Тишина бывает разной:\nГромкой, нежной, безотказной.\nТа, что после ссоры — лёд.\nТа, что перед рассветом — мёд.\n\nТа, что в храме — как молитва.\nТа, что в лесу — живая нитка.\nЯ собираю тишину\nВ ладони, будто бы волну.',
  },
  {
    id: 3,
    title: 'Первый снег',
    date: 'Декабрь 2024',
    tags: ['зима', 'детство'],
    preview: 'Он падал ночью, первый снег,\nНеслышно, тайно, не спеша.\nИ утром — белый первый смех\nОткрылся, как моя душа.',
    full: 'Он падал ночью, первый снег,\nНеслышно, тайно, не спеша.\nИ утром — белый первый смех\nОткрылся, как моя душа.\n\nВесь мир укрыт, укутан, нов,\nСтёрты тропы, стёрта боль.\nПод слоем первых зимних снов\nВсё снова стало быть собой.',
  },
];

const PROSE = [
  {
    id: 1,
    title: 'Старая мельница',
    date: 'Февраль 2025',
    tags: ['рассказ', 'деревня'],
    preview: 'На краю деревни стояла мельница. Никто уже не помнил, когда она работала последний раз. Говорили, что мельник ушёл однажды утром и не вернулся...',
    readTime: '5 мин',
  },
  {
    id: 2,
    title: 'Письмо без адреса',
    date: 'Апрель 2025',
    tags: ['эссе', 'размышление'],
    preview: 'Я пишу тебе письмо, не зная куда его отправить. Не потому что не знаю адреса — просто некоторые слова живут только в момент написания...',
    readTime: '3 мин',
  },
  {
    id: 3,
    title: 'Цвет дождя',
    date: 'Май 2025',
    tags: ['зарисовка', 'природа'],
    preview: 'Дождь не бывает одного цвета. Утренний — серебристый, почти прозрачный. Вечерний — тяжёлый, синий. А тот, что идёт в сумерках между — золотой...',
    readTime: '4 мин',
  },
];

const GALLERY = [
  { id: 1, title: 'Закат над рекой', type: 'Живопись', tags: ['акварель', 'пейзаж'], color: 'from-orange-900/40 to-amber-800/20' },
  { id: 2, title: 'Лесная тропа', type: 'Живопись', tags: ['масло', 'лес'], color: 'from-green-900/40 to-emerald-800/20' },
  { id: 3, title: 'Глиняная ваза', type: 'Поделка', tags: ['керамика', 'ручная работа'], color: 'from-stone-700/40 to-amber-900/20' },
  { id: 4, title: 'Городская зарисовка', type: 'Живопись', tags: ['графика', 'город'], color: 'from-slate-700/40 to-blue-900/20' },
  { id: 5, title: 'Плетёная корзинка', type: 'Поделка', tags: ['плетение', 'ручная работа'], color: 'from-yellow-900/40 to-amber-700/20' },
  { id: 6, title: 'Портрет в красном', type: 'Живопись', tags: ['акварель', 'портрет'], color: 'from-red-900/40 to-rose-800/20' },
];

type Section = 'home' | 'about' | 'poems' | 'prose' | 'gallery' | 'contacts';

// ─── Components ──────────────────────────────────────────────────────────────

function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative">
      <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm font-golos text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
      />
      {value && (
        <button onClick={() => onChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
          <Icon name="X" size={14} />
        </button>
      )}
    </div>
  );
}

function PoemCard({ poem, onOpen }: { poem: typeof POEMS[0]; onOpen: (p: typeof POEMS[0]) => void }) {
  return (
    <div className="card-creative" onClick={() => onOpen(poem)}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-cormorant text-xl font-medium text-foreground">{poem.title}</h3>
        <span className="text-xs text-muted-foreground font-golos mt-1 ml-3 flex-shrink-0">{poem.date}</span>
      </div>
      <pre className="font-cormorant text-sm text-foreground/70 italic whitespace-pre-wrap leading-relaxed mb-4 line-clamp-4">{poem.preview}</pre>
      <div className="flex items-center gap-2 flex-wrap">
        {poem.tags.map(t => <span key={t} className="badge-tag">{t}</span>)}
        <span className="ml-auto text-xs text-primary/60 font-golos">читать полностью →</span>
      </div>
    </div>
  );
}

function ProseCard({ item }: { item: typeof PROSE[0] }) {
  return (
    <div className="card-creative">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-cormorant text-xl font-medium text-foreground">{item.title}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground font-golos mt-1 ml-3 flex-shrink-0">
          <Icon name="Clock" size={12} />
          <span>{item.readTime}</span>
        </div>
      </div>
      <p className="text-sm text-foreground/70 font-golos leading-relaxed mb-4 line-clamp-3">{item.preview}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {item.tags.map(t => <span key={t} className="badge-tag">{t}</span>)}
        </div>
        <span className="text-xs text-muted-foreground font-golos">{item.date}</span>
      </div>
    </div>
  );
}

function GalleryCard({ item }: { item: typeof GALLERY[0] }) {
  return (
    <div className="card-creative overflow-hidden">
      <div className={`rounded-lg h-40 bg-gradient-to-br ${item.color} mb-4 flex items-center justify-center border border-white/5`}>
        <Icon name={item.type === 'Живопись' ? 'Palette' : 'Shapes'} size={32} className="text-white/30" />
      </div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-cormorant text-lg font-medium text-foreground">{item.title}</h3>
        <span className="text-xs text-primary/70 font-golos ml-2 flex-shrink-0">{item.type}</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {item.tags.map(t => <span key={t} className="badge-tag">{t}</span>)}
      </div>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HomeSection({ setSection }: { setSection: (s: Section) => void }) {
  return (
    <div className="min-h-[90vh] flex flex-col justify-center">
      <div className="max-w-3xl mx-auto text-center px-4 py-20">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <div className="divider-ornate mb-8">
            <span className="text-xs font-golos tracking-[0.3em] text-muted-foreground uppercase">Творческое пространство</span>
          </div>
        </div>

        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <h1 className="font-cormorant font-light text-6xl md:text-7xl lg:text-8xl leading-none mb-6">
            <span className="text-shimmer">Мир слов</span>
            <br />
            <span className="text-foreground/80">и образов</span>
          </h1>
        </div>

        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}>
          <p className="font-golos text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-12">
            Здесь живут стихи, рождаются истории,
            хранятся картины и поделки — всё, что создаётся с душой.
          </p>
        </div>

        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: 'Стихи', icon: 'Feather', section: 'poems' as Section },
              { label: 'Проза', icon: 'BookOpen', section: 'prose' as Section },
              { label: 'Галерея', icon: 'Image', section: 'gallery' as Section },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => setSection(item.section)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 font-golos text-sm text-foreground/80 hover:text-foreground"
              >
                <Icon name={item.icon} size={16} className="text-primary" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
        <div className="max-w-2xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-3 gap-4 border border-border rounded-2xl bg-card/50 p-6">
            {[
              { num: POEMS.length, label: 'стихотворения' },
              { num: PROSE.length, label: 'рассказа' },
              { num: GALLERY.length, label: 'работ в галерее' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-cormorant text-4xl font-light text-primary">{s.num}</div>
                <div className="font-golos text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        <h2 className="section-title mb-8">О творчестве</h2>
      </div>
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        <div className="space-y-6 font-golos text-foreground/80 leading-relaxed text-base">
          <p>
            Творчество для меня — это способ разговаривать с миром на языке, который точнее слов обыденных.
            Стихи рождаются из моментов, которые иначе ускользнули бы.
          </p>
          <p>
            Проза — это попытка удержать тишину между событиями, те паузы, в которых,
            кажется, и происходит настоящая жизнь.
          </p>
          <p>
            Живопись и поделки — когда слова не нужны совсем. Руки знают что-то,
            о чём разум ещё не догадывается.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4">
          {[
            { icon: 'Feather', title: 'Поэзия', desc: 'Рифмованная и верлибр' },
            { icon: 'BookOpen', title: 'Проза', desc: 'Рассказы, эссе, зарисовки' },
            { icon: 'Palette', title: 'Живопись', desc: 'Акварель, масло, графика' },
            { icon: 'Shapes', title: 'Поделки', desc: 'Керамика, плетение, декор' },
          ].map(item => (
            <div key={item.title} className="card-creative">
              <Icon name={item.icon} size={20} className="text-primary mb-3" />
              <div className="font-cormorant text-lg font-medium text-foreground">{item.title}</div>
              <div className="font-golos text-xs text-muted-foreground mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PoemsSection() {
  const [search, setSearch] = useState('');
  const [openPoem, setOpenPoem] = useState<typeof POEMS[0] | null>(null);

  const filtered = useMemo(() => {
    if (!search) return POEMS;
    const q = search.toLowerCase();
    return POEMS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.preview.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    );
  }, [search]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        <h2 className="section-title mb-2">Стихи</h2>
        <p className="font-golos text-sm text-muted-foreground mb-8">{POEMS.length} стихотворений</p>
      </div>

      <div className="opacity-0 animate-fade-up mb-8" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Поиск по стихам..." />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground font-golos">
          <Icon name="SearchX" size={32} className="mx-auto mb-3 opacity-40" />
          Ничего не найдено
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((poem, i) => (
            <div key={poem.id} className="opacity-0 animate-fade-up" style={{ animationDelay: `${0.1 + 0.08 * i}s`, animationFillMode: 'forwards' }}>
              <PoemCard poem={poem} onOpen={setOpenPoem} />
            </div>
          ))}
        </div>
      )}

      {openPoem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setOpenPoem(null)}
        >
          <div
            className="bg-card border border-border rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-fade-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h3 className="font-cormorant text-2xl font-medium text-foreground">{openPoem.title}</h3>
              <button onClick={() => setOpenPoem(null)} className="text-muted-foreground hover:text-foreground transition-colors ml-4">
                <Icon name="X" size={18} />
              </button>
            </div>
            <pre className="font-cormorant text-base italic text-foreground/80 whitespace-pre-wrap leading-relaxed mb-6">{openPoem.full}</pre>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {openPoem.tags.map(t => <span key={t} className="badge-tag">{t}</span>)}
              </div>
              <span className="text-xs text-muted-foreground font-golos">{openPoem.date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProseSection() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return PROSE;
    const q = search.toLowerCase();
    return PROSE.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.preview.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    );
  }, [search]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        <h2 className="section-title mb-2">Проза</h2>
        <p className="font-golos text-sm text-muted-foreground mb-8">{PROSE.length} текста</p>
      </div>

      <div className="opacity-0 animate-fade-up mb-8" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Поиск по прозе..." />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground font-golos">
          <Icon name="SearchX" size={32} className="mx-auto mb-3 opacity-40" />
          Ничего не найдено
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item, i) => (
            <div key={item.id} className="opacity-0 animate-fade-up" style={{ animationDelay: `${0.1 + 0.08 * i}s`, animationFillMode: 'forwards' }}>
              <ProseCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GallerySection() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('Все');

  const types = ['Все', 'Живопись', 'Поделка'];

  const filtered = useMemo(() => {
    let items = GALLERY;
    if (filter !== 'Все') items = items.filter(i => i.type === filter);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.tags.some(t => t.includes(q)) ||
        i.type.toLowerCase().includes(q)
      );
    }
    return items;
  }, [search, filter]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        <h2 className="section-title mb-2">Галерея</h2>
        <p className="font-golos text-sm text-muted-foreground mb-8">{GALLERY.length} работ</p>
      </div>

      <div className="opacity-0 animate-fade-up mb-6" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Поиск по галерее..." />
      </div>

      <div className="opacity-0 animate-fade-up mb-8" style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}>
        <div className="flex gap-2">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-golos transition-all duration-200 border ${
                filter === t
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground font-golos">
          <Icon name="SearchX" size={32} className="mx-auto mb-3 opacity-40" />
          Ничего не найдено
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <div key={item.id} className="opacity-0 animate-fade-up" style={{ animationDelay: `${0.08 * i}s`, animationFillMode: 'forwards' }}>
              <GalleryCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ContactsSection() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        <h2 className="section-title mb-2">Контакты</h2>
        <p className="font-golos text-sm text-muted-foreground mb-10">Напишите мне — буду рада общению</p>
      </div>

      <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        <div className="card-creative space-y-5 mb-8">
          {[
            { icon: 'Mail', label: 'Электронная почта', value: 'ваш@email.ru' },
            { icon: 'MessageCircle', label: 'Telegram', value: '@ваш_аккаунт' },
            { icon: 'Instagram', label: 'Instagram', value: '@ваш_профиль' },
          ].map(c => (
            <div key={c.label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={c.icon} size={16} className="text-primary" />
              </div>
              <div>
                <div className="font-golos text-xs text-muted-foreground">{c.label}</div>
                <div className="font-golos text-sm text-foreground">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <div>
            <label className="font-golos text-xs text-muted-foreground block mb-1.5">Ваше имя</label>
            <input
              type="text"
              placeholder="Иван Иванов"
              className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm font-golos text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div>
            <label className="font-golos text-xs text-muted-foreground block mb-1.5">Сообщение</label>
            <textarea
              placeholder="Ваше сообщение..."
              rows={4}
              className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-sm font-golos text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-golos text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Отправить сообщение
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: 'home',     label: 'Главная',      icon: 'Sparkles' },
  { id: 'about',    label: 'О творчестве', icon: 'User' },
  { id: 'poems',    label: 'Стихи',        icon: 'Feather' },
  { id: 'prose',    label: 'Проза',        icon: 'BookOpen' },
  { id: 'gallery',  label: 'Галерея',      icon: 'Image' },
  { id: 'contacts', label: 'Контакты',     icon: 'Mail' },
];

export default function Index() {
  const [section, setSection] = useState<Section>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderSection = () => {
    switch (section) {
      case 'home':     return <HomeSection setSection={setSection} />;
      case 'about':    return <AboutSection />;
      case 'poems':    return <PoemsSection />;
      case 'prose':    return <ProseSection />;
      case 'gallery':  return <GallerySection />;
      case 'contacts': return <ContactsSection />;
    }
  };

  const navigate = (s: Section) => {
    setSection(s);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('home')}
            className="font-cormorant text-xl font-medium hover:opacity-80 transition-opacity"
          >
            <span className="text-shimmer">Моё творчество</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`nav-link ${section === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground/70 hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-md">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-golos transition-all ${
                    section === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/70 hover:text-foreground hover:bg-card'
                  }`}
                >
                  <Icon name={item.icon} size={16} className={section === item.id ? 'text-primary' : 'text-muted-foreground'} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Content */}
      <main key={section} className="animate-fade-in">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-lg text-foreground/60">Моё творчество</span>
          <span className="font-golos text-xs text-muted-foreground">© 2025 · Все работы защищены авторским правом</span>
        </div>
      </footer>
    </div>
  );
}
