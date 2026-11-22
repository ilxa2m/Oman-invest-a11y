const OMAN_LOCATIONS = [
  {
    id: 'jabal-akhdar',
    name: 'الجبل الأخضر',
    governorate: 'محافظة الداخلية',
    wikiTitle: 'الجبل_الأخضر_(عمان)',
    coords: [23.0736, 57.6694],
    tourismScore: 98,
    populationScore: 45,
    avgRentOMR: 450,
    suitableFor: ['tourism', 'cafe'],
    audiences: ['tourists', 'families'],
    highlights: ['وجهة سياحية عالمية على مدار العام', 'إقبال مرتفع على النُزل البيئية والمقاهي ذات الإطلالة', 'قوة شرائية عالية للزوار'],
    summary: 'وجهة جبلية سياحية من الطراز الأول، مثالية للمنتجعات، النُزل البيئية، والمقاهي ذات الإطلالات الطبيعية.'
  },
  {
    id: 'salalah',
    name: 'صلالة (منطقة الحافة / الدهاريز)',
    governorate: 'محافظة ظفار',
    wikiTitle: 'صلالة',
    coords: [17.0151, 54.0924],
    tourismScore: 96,
    populationScore: 82,
    avgRentOMR: 380,
    suitableFor: ['tourism', 'perfume', 'cafe'],
    audiences: ['tourists', 'families'],
    highlights: ['ذروة سياحية استثنائية في موسم الخريف والشتاء', 'مركز رئيسي لتجارة اللبان والعطور العُمانية', 'كثافة زوار من دول الخليج'],
    summary: 'عاصمة السياحة الموسمية في عُمان، تتفوق في مشاريع الضيافة، المطاعم، ومتاجر اللبان والعطور.'
  },
  {
    id: 'alkhoudh',
    name: 'الخوض السادسة',
    governorate: 'محافظة مسقط (السيب)',
    wikiTitle: 'السيب',
    coords: [23.6215, 58.1887],
    tourismScore: 40,
    populationScore: 97,
    avgRentOMR: 500,
    suitableFor: ['cafe', 'services'],
    audiences: ['youth', 'families'],
    highlights: ['أعلى كثافة شبابية وطلابية لقربها من جامعة السلطان قابوس', 'حركة تجارية نشطة طوال اليوم وحتى منتصف الليل', 'مناسبة للمقاهي المختصة والمشاريع الناشئة'],
    summary: 'قلب النشاط الشبابي والتجاري في السيب، مثالية للمقاهي المختصة، المطاعم السريعة، ومكاتب الخدمات.'
  },
  {
    id: 'mutrah',
    name: 'كورنيش وسوق مطرح',
    governorate: 'محافظة مسقط',
    wikiTitle: 'مطرح',
    coords: [23.6203, 58.5646],
    tourismScore: 94,
    populationScore: 75,
    avgRentOMR: 320,
    suitableFor: ['perfume', 'tourism', 'cafe'],
    audiences: ['tourists', 'families'],
    highlights: ['نقطة توقف أساسية للسفن السياحية والزوار الأجانب', 'بيئة مثالية للعطور، البخور، الفضيات، والهدايا التراثية', 'طابع معماري وتاريخي جاذب'],
    summary: 'المركز التراثي والسياحي الأبرز في مسقط، يتفوق في متاجر البخور والعطور والهدايا التذكارية والمقاهي التراثية.'
  },
  {
    id: 'almouj',
    name: 'الموج مسقط',
    governorate: 'محافظة مسقط',
    wikiTitle: 'الموج_مسقط',
    coords: [23.6315, 58.2738],
    tourismScore: 88,
    populationScore: 78,
    avgRentOMR: 850,
    suitableFor: ['cafe', 'perfume', 'services'],
    audiences: ['tourists', 'families', 'youth'],
    highlights: ['واجهة بحرية راقية تجذب المقيمين والسياح', 'قوة شرائية مرتفعة جداً للعلامات التجارية الفاخرة', 'بنية تحتية حديثة ومواقف منظمة'],
    summary: 'وجهة عصرية فاخرة تجمع بين السياحة والسكن الراقي، تناسب العلامات التجارية المميزة والمقاهي الراقية.'
  },
  {
    id: 'sohar',
    name: 'صحار (الوقيبة / الكورنيش)',
    governorate: 'محافظة شمال الباطنة',
    wikiTitle: 'صحار',
    coords: [24.3461, 56.7075],
    tourismScore: 62,
    populationScore: 91,
    avgRentOMR: 280,
    suitableFor: ['services', 'cafe', 'perfume'],
    audiences: ['families', 'youth'],
    highlights: ['ثاني أكبر ثقل سكاني واقتصادي في السلطنة', 'إيجارات تجارية تنافسية مقارنة بمسقط', 'نمو صناعي ولوجستي مستمر'],
    summary: 'العاصمة الصناعية لشمال الباطنة بكثافة سكانية عالية وإيجارات اقتصادية مناسبة للتوسع التجاري والخدمي.'
  }
];

let map;
let markers = {};
let activeLocation = OMAN_LOCATIONS[0];

// تهيئة الخريطة التفاعلية الملونة 
function initMap() {
  map = L.map('omanMap').setView([21.5, 56.5], 6);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
    maxZoom: 18
  }).addTo(map);

  OMAN_LOCATIONS.forEach(loc => {
    const marker = L.marker(loc.coords).addTo(map);
    marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.governorate}`);
    marker.on('click', () => selectLocation(loc));
    markers[loc.id] = marker;
  });
}

// حساب نسبة التوافق بناءً على مدخلات المستثمر
function calculateMatch(loc, filters) {
  let score = 60;
  if (filters.businessType === 'all' || loc.suitableFor.includes(filters.businessType)) score += 15;
  if (filters.targetAudience === 'all' || loc.audiences.includes(filters.targetAudience)) score += 12;

  if (filters.priorityFactor === 'tourism_high') score += Math.round(loc.tourismScore * 0.13);
  else if (filters.priorityFactor === 'population_high') score += Math.round(loc.populationScore * 0.13);
  else if (filters.priorityFactor === 'budget_friendly') score += loc.avgRentOMR <= 380 ? 13 : 4;
  else score += Math.round(((loc.tourismScore + loc.populationScore) / 2) * 0.12);

  return Math.min(score, 99);
}

// عرض البطاقات مرتبة حسب التوافق
function renderLocations() {
  const filters = {
    businessType: document.getElementById('businessType').value,
    targetAudience: document.getElementById('targetAudience').value,
    priorityFactor: document.getElementById('priorityFactor').value
  };

  const ranked = OMAN_LOCATIONS
    .map(loc => ({ ...loc, matchScore: calculateMatch(loc, filters) }))
    .sort((a, b) => b.matchScore - a.matchScore);

  const listEl = document.getElementById('locationsList');
  listEl.innerHTML = '';
  document.getElementById('resultsCount').textContent = `${ranked.length} مواقع مرشحة`;

  ranked.forEach((loc, index) => {
    const card = document.createElement('article');
    card.className = `loc-card ${activeLocation.id === loc.id ? 'active' : ''}`;
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${loc.name}، نسبة التوافق ${loc.matchScore} بالمئة`);

    const badgeSymbol = loc.matchScore >= 90 ? '★ ممتاز' : loc.matchScore >= 80 ? '◆ مناسب جداً' : '● جيد';

    card.innerHTML = `
      <div class="loc-top">
        <div>
          <h3 class="loc-title">#${index + 1} ${loc.name}</h3>
          <span class="loc-region">${loc.governorate}</span>
        </div>
        <span class="score-pill">${badgeSymbol} (${loc.matchScore}%)</span>
      </div>
      <p>${loc.summary}</p>
      <div class="loc-tags">
        <span class="tag">✈️ السياحة: ${loc.tourismScore}%</span>
        <span class="tag">👥 الكثافة السكانية: ${loc.populationScore}%</span>
        <span class="tag">💰 متوسط الإيجار: ${loc.avgRentOMR} OMR</span>
      </div>
      <div class="loc-actions">
        <span class="loc-region">اضغط لعرض الخريطة وبيانات ويكيبيديا</span>
        <button type="button" class="btn btn-sm btn-outline speak-card-btn" aria-label="قراءة بطاقة ${loc.name} صوتياً">
          🔊 استمع
        </button>
      </div>
    `;

    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('speak-card-btn')) {
        selectLocation(loc);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectLocation(loc);
      }
    });

    card.querySelector('.speak-card-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const text = `${loc.name} في ${loc.governorate}. نسبة التوافق ${loc.matchScore} بالمئة. مؤشر السياحة ${loc.tourismScore} بالمئة، الكثافة السكانية ${loc.populationScore} بالمئة، ومتوسط الإيجار ${loc.avgRentOMR} ريال عماني. ${loc.summary}`;
      window.OmanA11y.speak(text);
    });

    listEl.appendChild(card);
  });

  if (ranked.length > 0) selectLocation(ranked[0], false);
}

// تحديد موقع وجلب بياناته الحية من Wikipedia API
async function selectLocation(loc, flyTo = true) {
  activeLocation = loc;

  document.querySelectorAll('.loc-card').forEach(c => c.classList.remove('active'));
  if (flyTo && map && markers[loc.id]) {
    map.flyTo(loc.coords, 11, { duration: 1.2 });
    markers[loc.id].openPopup();
  }

  document.getElementById('detailTitle').textContent = `${loc.name} (${loc.governorate})`;
  document.getElementById('detailMetrics').innerHTML = `
    <div class="metric-box"><span>الإقبال السياحي</span><strong>${loc.tourismScore}%</strong></div>
    <div class="metric-box"><span>الكثافة السكانية</span><strong>${loc.populationScore}%</strong></div>
    <div class="metric-box"><span>متوسط الإيجار</span><strong>${loc.avgRentOMR} OMR</strong></div>
  `;

  const wikiSummaryEl = document.getElementById('wikiSummary');
  const wikiLinkEl = document.getElementById('wikiLink');
  wikiSummaryEl.textContent = 'جاري جلب المعلومات الموثقة من ويكيبيديا...';

  try {
    const res = await fetch(`https://ar.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(loc.wikiTitle)}`);
    const data = await res.json();
    wikiSummaryEl.textContent = data.extract || loc.summary;
    wikiLinkEl.href = data.content_urls?.desktop?.page || `https://ar.wikipedia.org/wiki/${encodeURIComponent(loc.wikiTitle)}`;
  } catch (err) {
    wikiSummaryEl.textContent = loc.summary;
    wikiLinkEl.href = `https://ar.wikipedia.org/wiki/${encodeURIComponent(loc.wikiTitle)}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  renderLocations();

  document.getElementById('investForm').addEventListener('submit', (e) => {
    e.preventDefault();
    renderLocations();
    window.OmanA11y.speak('تم تحديث قائمة المواقع الاستثمارية الأنسب لمشروعك.');
  });

  document.getElementById('speakDetailBtn').addEventListener('click', () => {
    const title = document.getElementById('detailTitle').textContent;
    const wiki = document.getElementById('wikiSummary').textContent;
    window.OmanA11y.speak(`${title}. ${wiki}`);
  });

  document.getElementById('readPageBtn').addEventListener('click', () => {
    window.OmanA11y.speak('مرحباً بك في مُيسّر الاستثمار العُماني. يمكنك اختيار نوع البزنس والفئة المستهدفة لعرض أفضل المواقع في سلطنة عمان مع خرائط تفاعلية وقراءة صوتية.');
  });
});