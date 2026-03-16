
import { ChecklistItem, DiagnosisQuestion } from './types';

export const COLORS = {
  primary: '#F36F21', // LIXIL Orange
  secondary: '#555555',
  bg: '#F8F9FA',
  white: '#FFFFFF',
  success: '#4CAF50',
};

export const GENERAL_CHECKLIST: ChecklistItem[] = [
  {
    id: 'gen-1',
    title: '今の住まいの不満を書き出す',
    description: '困っていることや「もっとこうなればいいな」を整理しましょう。',
    completed: false,
    category: 'general',
    type: 'check'
  },
  {
    id: 'gen-2',
    title: '理想の暮らしのイメージを膨らませる',
    description: 'リフォーム事例を見て、好きなスタイルを見つけましょう。',
    completed: false,
    category: 'general',
    type: 'check'
  },
  {
    id: 'gen-3',
    title: 'リフォームの流れを確認する',
    description: 'リフォームにはどんなステップがあるのか全体像を把握しましょう。',
    completed: false,
    category: 'general',
    type: 'check'
  }
];

export const SEMI_LATENT_CHECKLIST: ChecklistItem[] = [
  {
    id: 'semi-1',
    title: 'リフォームの流れを把握する',
    description: 'リフォームにはどんなステップがあるのか全体像を把握しましょう。',
    completed: false,
    category: 'semi-latent',
    subCategory: 'リフォーム知識の収集',
    type: 'link',
    url: 'https://www.lixil.co.jp/reform/basic/step/'
  },
  {
    id: 'semi-2',
    title: '今の家の「不便な点・不満な点」をリストアップする',
    description: '日々の生活で感じている不満を書き出して整理しましょう。',
    completed: false,
    category: 'semi-latent',
    subCategory: '現状と希望の整理',
    type: 'input',
    inputPlaceholder: '例：キッチンが狭い、冬場のお風呂が寒いなど'
  },
  {
    id: 'semi-3',
    title: '家族会議で「Must」と「Want」を整理する',
    description: '絶対にやりたいことと、できればやりたいことを家族で話し合いましょう。',
    completed: false,
    category: 'semi-latent',
    subCategory: '現状と希望の整理',
    type: 'input',
    inputs: [
      { key: 'must', label: '絶対にやりたい（Must）', placeholder: '例：対面キッチンにしたい' },
      { key: 'want', label: 'できればやりたい（Want）', placeholder: '例：食洗機をつけたい' }
    ]
  },
  {
    id: 'semi-4',
    title: '好みのデザインや間取りのイメージを固める',
    description: '施工事例やSNSを見て、理想のイメージを探しましょう。',
    completed: false,
    category: 'semi-latent',
    subCategory: '理想と予算の具体化',
    type: 'link',
    urls: [
      { label: '施工事例を見る', url: 'https://www.lixil.co.jp/reform/case-rf/top/' },
      { label: '公式Instagram', url: 'https://www.instagram.com/lixil_official/' }
    ]
  },
  {
    id: 'semi-5',
    title: 'リフォーム費用の「目安・相場」を把握する',
    description: 'どれくらいの費用がかかるのか、相場を確認しましょう。',
    completed: false,
    category: 'semi-latent',
    subCategory: '理想と予算の具体化',
    type: 'link',
    url: 'https://www.lixil.co.jp/reform/case/'
  },
  {
    id: 'semi-6',
    title: '「補助金・減税・キャンペーン」の情報を調べる',
    description: 'お得にリフォームできる制度をチェックしましょう。',
    completed: false,
    category: 'semi-latent',
    subCategory: '理想と予算の具体化',
    type: 'link',
    url: 'https://www.lixil.co.jp/shoenehojokin/2026/'
  },
  {
    id: 'semi-7',
    title: 'リフォーム業者の選び方を知る',
    description: '信頼できる業者を選ぶためのポイントを確認しましょう。',
    completed: false,
    category: 'semi-latent',
    subCategory: 'リフォーム知識の収集',
    type: 'link',
    url: 'https://www.lixil.co.jp/reform/qa/company/'
  },
  {
    id: 'semi-8',
    title: '商品の選び方や特長の調べ方を知る',
    description: '自分に合った商品を見つけるためのヒントを探しましょう。',
    completed: false,
    category: 'semi-latent',
    subCategory: 'リフォーム知識の収集',
    type: 'link',
    url: 'https://www.lixil.co.jp/lineup/navi-portal/#new_lxl-tabBox_tab01'
  },
  {
    id: 'semi-9',
    title: '近くのショールーム場所と雰囲気を調べてみる',
    description: 'お近くのショールームを検索してみましょう。',
    completed: false,
    category: 'semi-latent',
    subCategory: 'ショールームで実物を体験',
    type: 'link',
    urls: [
      { label: 'ショールーム検索', url: 'https://www.lixil.co.jp/showroom/#lxl-mapsearch' },
      { label: '展示品検索', url: 'https://tenji.lixil.co.jp/search/?mode=search&page=1&disp=0' }
    ]
  },
  {
    id: 'semi-10',
    title: '一度ショールームにいってみる',
    description: '実際に商品を見て、触れて、体感してみましょう。',
    completed: false,
    category: 'semi-latent',
    subCategory: 'ショールームで実物を体験',
    type: 'link',
    url: 'https://www.lixil.co.jp/showroom/virtual/'
  }
];

export const LATENT_CHECKLIST: ChecklistItem[] = [
  {
    id: 'lat-1',
    title: 'シミュレーションを活用してプランを具体化する',
    description: 'カラーシミュレーションなどで、具体的なイメージを作りましょう。',
    completed: false,
    category: 'latent',
    subCategory: 'プランと商品の詳細確認',
    type: 'link',
    url: 'https://www.lixil.co.jp/lineup/navi-portal/image03.htm'
  },
  {
    id: 'lat-2',
    title: 'プロ探し：リフォーム業者をさがす',
    description: 'お住まいの地域の優良なリフォーム業者を探しましょう。',
    completed: false,
    category: 'latent',
    subCategory: 'リフォーム店探しと相談準備',
    type: 'link',
    url: 'https://www.lixil.co.jp/reform/shop/'
  },
  {
    id: 'lat-3',
    title: 'プロに聞きたい不安点を書き出す',
    description: '相談時に聞き漏らしがないよう、質問リストを作成しましょう。',
    completed: false,
    category: 'latent',
    subCategory: 'リフォーム店探しと相談準備',
    type: 'input',
    inputPlaceholder: '例：工事期間は？、住みながらできる？など'
  },
  {
    id: 'lat-4',
    title: 'ショールームで詳細を確認',
    description: '素材の質感や使い勝手など、細かい部分を実物で確認しましょう。',
    completed: false,
    category: 'latent',
    subCategory: 'プランと商品の詳細確認',
    type: 'check'
  },
  {
    id: 'lat-5',
    title: '見積・提案をもらう',
    description: '業者から具体的なプランと見積書を受け取りましょう。',
    completed: false,
    category: 'latent',
    subCategory: '見積りの比較と内容チェック',
    type: 'check'
  },
  {
    id: 'lat-6',
    title: '相見積もりで比較検討',
    description: '必要に応じて、複数の提案を比較して納得のいくプランを選びましょう。',
    completed: false,
    category: 'latent',
    subCategory: '見積りの比較と内容チェック',
    type: 'check',
    hideQRLabel: true
  },
  {
    id: 'lat-7',
    title: '見積もりチェックと質問',
    description: '不明な点があれば、納得いくまで業者に質問しましょう。',
    completed: false,
    category: 'latent',
    subCategory: '見積りの比較と内容チェック',
    type: 'check',
    hideQRLabel: true
  },
  {
    id: 'lat-8',
    title: '保証内容の確認',
    description: '瑕疵保険やアフターサービスの内容をしっかり確認しましょう。',
    completed: false,
    category: 'latent',
    subCategory: '契約と工事に向けた準備',
    type: 'check',
    hideQRLabel: true
  },
  {
    id: 'lat-9',
    title: '資金計画の最終確認',
    description: 'ローンや減税制度の手続き方法を確認しましょう。',
    completed: false,
    category: 'latent',
    subCategory: '契約と工事に向けた準備',
    type: 'check',
    hideQRLabel: true
  },
  {
    id: 'lat-10',
    title: 'スケジュール確認',
    description: '工事期間中の生活や荷物移動の計画を立てましょう。',
    completed: false,
    category: 'latent',
    subCategory: '契約と工事に向けた準備',
    type: 'check',
    hideQRLabel: true
  }
];

export const DIAGNOSIS_QUESTIONS: DiagnosisQuestion[] = [
  {
    id: 'q1',
    question: '今回、リフォームを考え始めたきっかけは？',
    options: [
      { id: 'o1-1', text: '今の暮らしを良くしたい', targetSegment: 'semi-latent' },
      { id: 'o1-2', text: 'ライフスタイルの変化', targetSegment: 'latent' },
      { id: 'o1-3', text: '設備の老朽化・故障', targetSegment: 'latent' },
      { id: 'o1-4', text: 'なんとなく興味がある', targetSegment: 'semi-latent' }
    ]
  },
  {
    id: 'q2',
    question: '今のご検討状況はどのあたりですか？',
    options: [
      { id: 'o2-1', text: '情報収集中・勉強中', targetSegment: 'semi-latent' },
      { id: 'o2-2', text: '家族と相談中', targetSegment: 'semi-latent' },
      { id: 'o2-3', text: '予算や時期を検討中', targetSegment: 'latent' },
      { id: 'o2-4', text: '会社選び・比較中', targetSegment: 'latent' }
    ]
  },
  {
    id: 'q5',
    question: 'いつ頃までにリフォームしたいですか？',
    options: [
      { id: 'o5-1', text: '時期は決まっていない', targetSegment: 'semi-latent' },
      { id: 'o5-2', text: '1年以内には', targetSegment: 'semi-latent' },
      { id: 'o5-3', text: '半年以内には', targetSegment: 'latent' },
      { id: 'o5-4', text: 'できるだけ早く', targetSegment: 'latent' }
    ]
  },
  {
    id: 'q3',
    question: 'リフォームしたい場所はどこですか？',
    options: [
      { id: 'o3-1', text: 'キッチン', targetSegment: 'latent' },
      { id: 'o3-2', text: '浴室', targetSegment: 'latent' },
      { id: 'o3-3', text: 'トイレ等の水回り', targetSegment: 'latent' },
      { id: 'o3-4', text: 'リビング', targetSegment: 'latent' },
      { id: 'o3-5', text: '寝室', targetSegment: 'latent' },
      { id: 'o3-6', text: '間取り変更等の「空間」', targetSegment: 'latent' },
      { id: 'o3-7', text: '全体的に/決まっていない', targetSegment: 'semi-latent' }
    ]
  },
  {
    id: 'q4',
    question: '今、一番「困ったな」と感じていることは？',
    options: [
      { id: 'o4-1', text: 'イメージが定まらない', targetSegment: 'semi-latent' },
      { id: 'o4-2', text: '予算・費用が心配', targetSegment: 'latent' },
      { id: 'o4-3', text: '業者の選び方が不安', targetSegment: 'latent' },
      { id: 'o4-4', text: '進め方・段取りが不明', targetSegment: 'semi-latent' }
    ]
  }
];
