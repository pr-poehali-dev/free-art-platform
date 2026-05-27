import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';

// ─── Data ────────────────────────────────────────────────────────────────────

const POEMS = [
  {
    id: 1,
    title: 'Осколки',
    date: 'Январь 2024',
    tags: ['душа', 'боль', 'исцеление'],
    preview: 'Я собираю себя по осколкам,\nКаждый острее, чем был вчера.\nНо в этих ранах — не горечь только,\nА свет, что ищет себе простора.',
    full: `Я собираю себя по осколкам,
Каждый острее, чем был вчера.
Но в этих ранах — не горечь только,
А свет, что ищет себе простора.

Я складываю себя заново,
Как витраж из битых зеркал.
И в каждом — отблеск чего-то главного,
Что я потеряла, но не забывала.

Пусть шрамы — не знаки поражения,
А карта дороги, что я прошла.
Я — это всё моё преображение,
И боль, и любовь, и свет без числа.`,
  },
  {
    id: 2,
    title: 'Тихий разговор',
    date: 'Март 2024',
    tags: ['природа', 'покой', 'рассвет'],
    preview: 'Утро приходит на цыпочках,\nНе потревожив ни птицу, ни сон.\nТолько рассвет золотыми строчками\nПишет на небе свой нежный закон.',
    full: `Утро приходит на цыпочках,
Не потревожив ни птицу, ни сон.
Только рассвет золотыми строчками
Пишет на небе свой нежный закон.

Тихо беседуют ветер с листвою,
Речка несёт свою старую речь.
Я замираю — и что-то живое
Входит в меня, как вечерняя свечь.

Слушать умею. Молчать — тоже умею.
Это и есть мой язык с тишиной.
В ней я сильнее, в ней я смелее —
В этой беседе наедине с собой.`,
  },
  {
    id: 3,
    title: 'Нити',
    date: 'Июнь 2024',
    tags: ['связь', 'любовь', 'время'],
    preview: 'Между нами — невидимые нити,\nТе, что рвутся и снова прядутся.\nВы их чувствуете? Не ищите —\nОни сами, когда надо, найдутся.',
    full: `Между нами — невидимые нити,
Те, что рвутся и снова прядутся.
Вы их чувствуете? Не ищите —
Они сами, когда надо, найдутся.

Расстояние — только в пространстве.
Сердце знает другую версту.
Я в твоём живу постоянстве,
Ты — в моём, как звезда в высоту.

Нити памяти, нити надежды,
Нити слов, что не сказаны вслух.
Мы связаны — с первого, прежнего,
С первого взгляда, до самого двух.`,
  },
  {
    id: 4,
    title: 'Мастерская',
    date: 'Сентябрь 2024',
    tags: ['творчество', 'создание', 'руки'],
    preview: 'Руки помнят то, что разум забыл,\nГлина помнит тепло ладоней.\nЯ лепила — и мир говорил\nЯзыком первобытных историй.',
    full: `Руки помнят то, что разум забыл,
Глина помнит тепло ладоней.
Я лепила — и мир говорил
Языком первобытных историй.

В каждой форме — мой молчаливый сказ,
В каждом цвете — что-то из детства.
Творчество — это тайный наказ:
Не бояться, не прятать сердца.

Мастерская пахнет землёй и мечтой,
Здесь ошибки становятся частью узора.
Я создаю — значит, я живая.
Значит, есть ещё смысл. И скоро.`,
  },
  {
    id: 5,
    title: 'Первый снег',
    date: 'Декабрь 2024',
    tags: ['зима', 'начало', 'чистота'],
    preview: 'Он падал ночью — первый, белый,\nНикем не прошенный, но жданный.\nИ мир проснулся обновлённым,\nКак будто снова первозданным.',
    full: `Он падал ночью — первый, белый,
Никем не прошенный, но жданный.
И мир проснулся обновлённым,
Как будто снова первозданным.

Замёрзли ветки в белых рукавицах,
Дорожки спрятались под пухом.
И детство снова мне приснится —
Горячий чай и тихий ухом.

Под первым снегом спит земля,
Копя весенние надежды.
Под первым снегом — и я,
Такая же — новая, прежняя.`,
  },
];

const PROSE = [
  {
    id: 1,
    title: 'Запах старой книги',
    date: 'Февраль 2024',
    tags: ['эссе', 'память', 'детство'],
    preview: 'Есть запахи, которые открывают дверь в другое время. Запах старой книги — один из них. Стоит поднести её к лицу, вдохнуть этот странный аромат пыли, бумаги и чужих прочитанных лет...',
    readTime: '4 мин',
  },
  {
    id: 2,
    title: 'Женщина у окна',
    date: 'Май 2024',
    tags: ['рассказ', 'наблюдение', 'жизнь'],
    preview: 'Каждое утро она стоит у окна с чашкой чая. Я вижу её из своего окна напротив. Мы никогда не разговаривали — но я знаю о ней, кажется, больше, чем о многих знакомых...',
    readTime: '6 мин',
  },
  {
    id: 3,
    title: 'О незавершённом',
    date: 'Август 2024',
    tags: ['эссе', 'размышление', 'творчество'],
    preview: 'В моей мастерской стоят три незаконченные работы. Я обхожу их каждый день, смотрю. Иногда думаю: может, именно незавершённость и есть самое честное состояние...',
    readTime: '5 мин',
  },
];

const GALLERY = [
  { id: 1, title: 'Закат над рекой', type: 'Живопись', tags: ['акварель', 'пейзаж'], color: 'from-orange-200/60 to-amber-100/40' },
  { id: 2, title: 'Лесная тропа', type: 'Живопись', tags: ['масло', 'лес'], color: 'from-green-200/60 to-emerald-100/40' },
  { id: 3, title: 'Глиняная ваза', type: 'Живое творчество', tags: ['керамика', 'ручная работа'], color: 'from-stone-300/60 to-amber-200/40' },
  { id: 4, title: 'Городская зарисовка', type: 'Живопись', tags: ['графика', 'город'], color: 'from-slate-300/60 to-blue-200/40' },
  { id: 5, title: 'Плетёная корзинка', type: 'Живое творчество', tags: ['плетение', 'ручная работа'], color: 'from-yellow-200/60 to-amber-100/40' },
  { id: 6, title: 'Портрет в красном', type: 'Живопись', tags: ['акварель', 'портрет'], color: 'from-red-200/60 to-rose-100/40' },
  { id: 7, title: 'Осенний венок', type: 'Живое творчество', tags: ['декор', 'природные материалы'], color: 'from-orange-300/60 to-yellow-200/40' },
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
        className="w-full bg-white/70 border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm font-golos text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors backdrop-blur-sm"
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
        <span className="text-xs font-golos mt-1 ml-3 flex-shrink-0 date-colored">{poem.date}</span>
      </div>
      <pre className="font-cormorant text-sm text-foreground/65 italic whitespace-pre-wrap leading-relaxed mb-4 line-clamp-4">{poem.preview}</pre>
      <div className="flex items-center gap-2 flex-wrap">
        {poem.tags.map(t => <span key={t} className="badge-tag">{t}</span>)}
        <span className="ml-auto text-xs font-golos" style={{ color: 'hsl(var(--gold))' }}>читать полностью →</span>
      </div>
    </div>
  );
}

function ProseCard({ item }: { item: typeof PROSE[0] }) {
  return (
    <div className="card-creative">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-cormorant text-xl font-medium text-foreground">{item.title}</h3>
        <div className="flex items-center gap-1 text-xs font-golos mt-1 ml-3 flex-shrink-0 text-muted-foreground">
          <Icon name="Clock" size={12} />
          <span>{item.readTime}</span>
        </div>
      </div>
      <p className="text-sm text-foreground/65 font-golos leading-relaxed mb-4 line-clamp-3">{item.preview}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {item.tags.map(t => <span key={t} className="badge-tag">{t}</span>)}
        </div>
        <span className="text-xs font-golos date-colored">{item.date}</span>
      </div>
    </div>
  );
}

function GalleryCard({ item }: { item: typeof GALLERY[0] }) {
  const isHandmade = item.type === 'Живое творчество';
  return (
    <div className="card-creative overflow-hidden">
      <div className={`rounded-lg h-40 bg-gradient-to-br ${item.color} mb-4 flex items-center justify-center border border-black/5`}>
        <Icon
          name={isHandmade ? 'Scissors' : 'Palette'}
          size={32}
          className="text-foreground/20"
        />
      </div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-cormorant text-lg font-medium text-foreground">{item.title}</h3>
        <span className="text-xs font-golos ml-2 flex-shrink-0" style={{ color: isHandmade ? 'hsl(var(--terra))' : 'hsl(var(--gold))' }}>
          {item.type}
        </span>
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
          <h1 className="font-cormorant font-light text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            <span className="text-shimmer">Мир слов и образов</span>
            <br />
            <span className="text-foreground/75">Ирины Кузьминой</span>
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
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-white/70 hover:border-primary/40 hover:bg-white/90 transition-all duration-300 font-golos text-sm text-foreground/70 hover:text-foreground backdrop-blur-sm"
                style={{ boxShadow: '0 2px 10px hsl(34 68% 46% / 0.07)' }}
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
          <div
            className="grid grid-cols-3 gap-4 rounded-2xl p-6"
            style={{
              background: 'rgba(255,255,255,0.65)',
              border: '1px solid hsl(var(--border))',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 24px hsl(34 68% 46% / 0.08)',
            }}
          >
            {[
              { num: POEMS.length, label: 'стихотворений' },
              { num: PROSE.length, label: 'рассказа' },
              { num: GALLERY.length, label: 'работ в галерее' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-cormorant text-4xl font-light" style={{ color: 'hsl(var(--gold))' }}>{s.num}</div>
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
        <div className="space-y-6 font-golos text-foreground/75 leading-relaxed text-base">
          <p>
            Творчество для меня — это способ разговаривать с миром на языке, который точнее слов обыденных.
            Стихи рождаются из моментов, которые иначе ускользнули бы.
          </p>
          <p>
            Проза — это попытка удержать тишину между событиями, те паузы, в которых,
            кажется, и происходит настоящая жизнь.
          </p>
          <p>
            Живопись и рукоделие — когда слова не нужны совсем. Руки знают что-то,
            о чём разум ещё не догадывается.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4">
          {[
            { icon: 'Feather', title: 'Поэзия', desc: 'Рифмованная и верлибр' },
            { icon: 'BookOpen', title: 'Проза', desc: 'Рассказы, эссе, зарисовки' },
            { icon: 'Palette', title: 'Живопись', desc: 'Акварель, масло, графика' },
            { icon: 'Scissors', title: 'Живое творчество', desc: 'Керамика, плетение, декор' },
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'hsl(40 35% 97% / 0.85)', backdropFilter: 'blur(10px)' }}
          onClick={() => setOpenPoem(null)}
        >
          <div
            className="rounded-2xl p-8 max-w-lg w-full animate-fade-up"
            style={{
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid hsl(var(--border))',
              boxShadow: '0 20px 60px hsl(34 68% 46% / 0.15), 0 4px 16px hsl(28 25% 14% / 0.08)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h3 className="font-cormorant text-2xl font-medium text-foreground">{openPoem.title}</h3>
              <button onClick={() => setOpenPoem(null)} className="text-muted-foreground hover:text-foreground transition-colors ml-4">
                <Icon name="X" size={18} />
              </button>
            </div>
            <pre className="font-cormorant text-base italic text-foreground/75 whitespace-pre-wrap leading-relaxed mb-6">{openPoem.full}</pre>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {openPoem.tags.map(t => <span key={t} className="badge-tag">{t}</span>)}
              </div>
              <span className="text-xs font-golos date-colored">{openPoem.date}</span>
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

  const types = ['Все', 'Живопись', 'Живое творчество'];

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
        <div className="flex gap-2 flex-wrap">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="px-4 py-1.5 rounded-full text-sm font-golos transition-all duration-200 border"
              style={
                filter === t
                  ? { background: 'hsl(var(--gold))', color: '#fff', borderColor: 'hsl(var(--gold))' }
                  : { background: 'transparent', color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }
              }
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
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'hsl(var(--gold) / 0.1)' }}>
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
              className="w-full bg-white/80 border border-border rounded-lg px-4 py-2.5 text-sm font-golos text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div>
            <label className="font-golos text-xs text-muted-foreground block mb-1.5">Сообщение</label>
            <textarea
              placeholder="Ваше сообщение..."
              rows={4}
              className="w-full bg-white/80 border border-border rounded-lg px-4 py-2.5 text-sm font-golos text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-golos text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ background: 'hsl(var(--gold))', color: '#fff' }}
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
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          borderColor: 'hsl(var(--border))',
          background: 'rgba(255,252,248,0.85)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('home')}
            className="font-cormorant text-xl font-medium hover:opacity-75 transition-opacity"
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
            className="md:hidden text-foreground/60 hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t animate-fade-up"
            style={{
              borderColor: 'hsl(var(--border))',
              background: 'rgba(255,252,248,0.97)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-golos transition-all"
                  style={
                    section === item.id
                      ? { color: 'hsl(var(--gold))', background: 'hsl(var(--gold) / 0.08)' }
                      : { color: 'hsl(var(--foreground) / 0.6)' }
                  }
                >
                  <Icon
                    name={item.icon}
                    size={16}
                    className={section === item.id ? 'text-primary' : 'text-muted-foreground'}
                  />
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
      <footer
        className="border-t py-8 mt-8"
        style={{ borderColor: 'hsl(var(--border))' }}
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-lg text-foreground/50">Моё творчество</span>
          <div className="flex items-center gap-2">
            <span className="font-golos text-xs text-muted-foreground">© 2025 · Все работы защищены авторским правом</span>
            <span className="infinity-symbol text-lg select-none">∞</span>
          </div>
        </div>
      </footer>
    </div>
  );
}