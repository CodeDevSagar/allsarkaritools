import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Select, Radio, Slider, Table, Progress, Divider, Space, Tag, InputNumber } from 'antd';
import { Calculator, Award, TrendingUp, AlertCircle, Coins, ArrowRight, ShieldCheck, MapPin, Percent } from 'lucide-react';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const PRESETS = {
  ssc: {
    name: 'SSC (Staff Selection Commission)',
    posts: [
      { title: 'Inspector (GST/Excise/IT) / ASO', level: 7, basic: 44900, desc: 'Group B Gazetted/Non-Gazetted' },
      { title: 'Sub-Inspector in CBI / NIA', level: 6, basic: 35400, desc: 'Group B Non-Gazetted' },
      { title: 'Auditor / Accountant / UDC', level: 5, basic: 29200, desc: 'Group C Clerk Grade' },
      { title: 'Tax Assistant / LDC / JSA', level: 4, basic: 25500, desc: 'Group C Assistant Grade' },
      { title: 'Multi-Tasking Staff (MTS)', level: 1, basic: 18000, desc: 'Group C Support Staff' }
    ]
  },
  upsc: {
    name: 'UPSC (Union Public Service Commission)',
    posts: [
      { title: 'Cabinet Secretary', level: 18, basic: 250000, desc: 'Apex Grade' },
      { title: 'Secretary to Govt of India / General', level: 17, basic: 225000, desc: 'Apex Scale' },
      { title: 'Joint Secretary to Govt of India', level: 14, basic: 144200, desc: 'Super Time Scale' },
      { title: 'Deputy Secretary / Director', level: 12, basic: 78800, desc: 'Junior Administrative Grade' },
      { title: 'IAS / IPS / IFS (Entry Level)', level: 10, basic: 56100, desc: 'Junior Time Scale (SDM/ASP)' }
    ]
  },
  bpsc: {
    name: 'BPSC (Bihar Public Service Commission)',
    posts: [
      { title: 'Sub-Divisional Magistrate (SDM) / DSP', level: 9, basic: 53100, desc: 'Class II Gazetted officer' },
      { title: 'Block Development Officer (BDO) / CO', level: 7, basic: 44900, desc: 'Non-Gazetted Administrative' },
      { title: 'Supply Inspector / Revenue Officer', level: 7, basic: 44900, desc: 'Class II Non-Gazetted' },
      { title: 'Tax Officer / Block Welfare Officer', level: 6, basic: 35400, desc: 'Class II Officer' }
    ]
  },
  bssc: {
    name: 'BSSC (Bihar Staff Selection Commission)',
    posts: [
      { title: 'Panchayat Secretary', level: 3, basic: 21700, desc: 'Rural Administrative Staff' },
      { title: 'Revenue Employee (Rajaswa Karmchari)', level: 2, basic: 19900, desc: 'Revenue Department Clerk' },
      { title: 'Lower Division Clerk (LDC)', level: 2, basic: 19900, desc: 'Secretariat Clerk Assistant' },
      { title: 'Office Attendant / Peon', level: 1, basic: 18000, desc: 'Support Staff Grade I' }
    ]
  },
  bsphcl: {
    name: 'BSPHCL (Bihar State Power Holding)',
    posts: [
      { title: 'Assistant Electrical Engineer (AEE)', level: 9, basic: 56100, desc: 'Class I Engineer Officer' },
      { title: 'Junior Electrical Engineer (JEE)', level: 7, basic: 47600, desc: 'Class II Technical Staff' },
      { title: 'Assistant IT Manager', level: 7, basic: 46800, desc: 'IT Administration' },
      { title: 'Correspondence Clerk / Store Asst', level: 4, basic: 25300, desc: 'Administrative Support' },
      { title: 'Junior Lineman / Technical Assistant', level: 2, basic: 18000, desc: 'Technical Field Staff' }
    ]
  },
  rssc: {
    name: 'RSSC / RPSC (Rajasthan Govt)',
    posts: [
      { title: 'RAS Officer / Deputy Collector', level: 14, basic: 56100, desc: 'Rajasthan Administrative Services' },
      { title: 'Rajasthan Patwari', level: 5, basic: 20800, desc: 'Revenue Field Staff' },
      { title: 'Junior Assistant / LDC', level: 5, basic: 20800, desc: 'Secretariat Support Service' },
      { title: 'Rajasthan Police Constable', level: 3, basic: 14600, desc: 'Home Guard / Constabulary' }
    ]
  },
  jeevika: {
    name: 'Jeevika (Bihar Livelihoods Society)',
    posts: [
      { title: 'State Project Manager (SPM)', level: 12, basic: 75000, desc: 'Contractual Fixed Salary' },
      { title: 'Block Project Manager (BPM)', level: 8, basic: 42000, desc: 'Contractual Block Head' },
      { title: 'Block IT Executive (BITG)', level: 5, basic: 24500, desc: 'Contractual Technical IT Staff' },
      { title: 'Block Accountant', level: 5, basic: 22000, desc: 'Contractual Finance & Accounts Staff' },
      { title: 'Area Coordinator (AC)', level: 5, basic: 24000, desc: 'Contractual Field Lead' },
      { title: 'Office Assistant', level: 3, basic: 18000, desc: 'Contractual Administrative Support' },
      { title: 'Community Coordinator (CC)', level: 3, basic: 16500, desc: 'Contractual Village Worker' }
    ]
  },
  bpsc_teacher: {
    name: 'BPSC Teacher (Bihar School Teacher)',
    posts: [
      { title: 'Primary Teacher (Class 1-5 / PRT)', level: 6, basic: 25000, desc: 'BPSC Primary Grade Teacher' },
      { title: 'Middle School Teacher (Class 6-8 / TGT)', level: 7, basic: 28000, desc: 'BPSC Upper Primary Grade Teacher' },
      { title: 'Secondary Teacher (Class 9-10)', level: 8, basic: 31000, desc: 'BPSC Secondary Grade Teacher' },
      { title: 'Higher Secondary Teacher (Class 11-12 / PGT)', level: 9, basic: 32000, desc: 'BPSC Senior Secondary Grade Teacher' }
    ]
  }
};

const CITY_CLASSES = [
  { value: 'X', label: 'Class X (Metro Cities e.g., Delhi, Mumbai)', HRA_PCT: 0.30, TA_BASE: 7200 },
  { value: 'Y', label: 'Class Y (Tier-2 Cities e.g., Patna, Jaipur, Pune)', HRA_PCT: 0.20, TA_BASE: 3600 },
  { value: 'Z', label: 'Class Z (Rural Areas / Tier-3 Towns)', HRA_PCT: 0.10, TA_BASE: 1800 }
];

export default function SalarySlabs() {
  const [calcMode, setCalcMode] = useState('preset'); // 'preset' | 'custom'
  
  // Selection states for Preset mode
  const [org, setOrg] = useState('ssc');
  const [postIndex, setPostIndex] = useState(0);
  const [cityClass, setCityClass] = useState('Y');
  
  // Custom mode states
  const [customBasic, setCustomBasic] = useState(44900);
  const [customDA, setCustomDA] = useState(50); // Current DA is 50%
  const [customHRA, setCustomHRA] = useState(20);
  const [customTA, setCustomTA] = useState(3600);

  // NPS/Tax choices
  const [includeNPS, setIncludeNPS] = useState(true);

  // Calculations
  const [results, setResults] = useState({
    basic: 0,
    da: 0,
    hra: 0,
    ta: 0,
    daOnTa: 0,
    gross: 0,
    npsDeduction: 0,
    stateTaxes: 0,
    netInHand: 0,
    govtNpsContribution: 0
  });

  // Calculate whenever parameters change
  useEffect(() => {
    let basic = 0;
    let daPct = 50; // default DA is 50%
    let hraPct = 0.20;
    let taBase = 3600;

    if (calcMode === 'preset') {
      const selectedOrg = PRESETS[org];
      const selectedPost = selectedOrg.posts[postIndex] || selectedOrg.posts[0];
      basic = selectedPost.basic;
      
      const selectedCity = CITY_CLASSES.find(c => c.value === cityClass) || CITY_CLASSES[1];
      hraPct = selectedCity.HRA_PCT;
      
      // Calculate TA according to pay level guidelines
      // Levels 9 & above: High TA; Levels 3-8: Mid TA; Levels 1-2: Low TA
      if (selectedPost.level >= 9) {
        taBase = selectedCity.value === 'X' ? 7200 : 3600;
      } else if (selectedPost.level >= 3) {
        taBase = selectedCity.value === 'X' ? 3600 : 1800;
      } else {
        taBase = selectedCity.value === 'X' ? 1350 : 900;
      }

      // Jeevika has a simplified fixed pay structure with limited variable HRA
      if (org === 'jeevika') {
        hraPct = 0.10; // fixed HRA
        taBase = 1500;  // fixed travel allowance
      }
    } else {
      basic = customBasic;
      daPct = customDA;
      hraPct = customHRA / 100;
      taBase = customTA;
    }

    const da = Math.round(basic * (daPct / 100));
    const hra = Math.round(basic * hraPct);
    const daOnTa = Math.round(taBase * (daPct / 100));
    const ta = taBase + daOnTa;

    const gross = basic + da + hra + ta;

    // Deductions
    // NPS: 10% of (Basic + DA)
    const npsDeduction = includeNPS ? Math.round((basic + da) * 0.10) : 0;
    
    // Govt NPS Contribution: 14% of (Basic + DA)
    const govtNpsContribution = includeNPS ? Math.round((basic + da) * 0.14) : 0;
    
    // Professional tax or standard local state tax deduction (average 150 - 250 Rs)
    const stateTaxes = gross > 30000 ? 250 : gross > 20000 ? 150 : 0;
    
    // CGHS / GIS (Central Government Health Scheme & Insurance)
    const medicalInsurance = calcMode === 'preset' && (org === 'ssc' || org === 'upsc') ? 650 : 200;

    const totalDeductions = npsDeduction + stateTaxes + medicalInsurance;
    const netInHand = gross - totalDeductions;

    setResults({
      basic,
      da,
      hra,
      ta: taBase,
      daOnTa,
      gross,
      npsDeduction,
      stateTaxes: stateTaxes + medicalInsurance,
      netInHand,
      govtNpsContribution
    });

  }, [calcMode, org, postIndex, cityClass, customBasic, customDA, customHRA, customTA, includeNPS]);

  // Update selected post index to 0 if organization changes
  const handleOrgChange = (value) => {
    setOrg(value);
    setPostIndex(0);
  };

  const currentOrg = PRESETS[org];

  // Table Data
  const columns = [
    { title: 'Salary Component', dataIndex: 'component', key: 'component', render: text => <span className="text-gray-300 font-semibold">{text}</span> },
    { title: 'Monthly Amount', dataIndex: 'amount', key: 'amount', align: 'right', render: amt => <span className="font-bold text-white">₹{amt.toLocaleString('en-IN')}</span> },
    { title: 'Type', dataIndex: 'type', key: 'type', align: 'center', render: type => <Tag color={type === 'Earning' ? 'green' : 'red'}>{type}</Tag> },
    { title: 'Description / Formula', dataIndex: 'desc', key: 'desc', render: desc => <span className="text-gray-500 text-xs">{desc}</span> }
  ];

  const tableData = [
    { key: 1, component: 'Basic Pay', amount: results.basic, type: 'Earning', desc: 'As per 7th Pay Matrix / Selected Level' },
    { key: 2, component: 'Dearness Allowance (DA)', amount: results.da, type: 'Earning', desc: 'Currently 50% of Basic Pay' },
    { key: 3, component: 'House Rent Allowance (HRA)', amount: results.hra, type: 'Earning', desc: `Based on City Class (X: 30%, Y: 20%, Z: 10%)` },
    { key: 4, component: 'Transport Allowance (TA)', amount: results.ta, type: 'Earning', desc: 'Travel allowance based on grade pay' },
    { key: 5, component: 'DA on Transport Allowance', amount: results.daOnTa, type: 'Earning', desc: 'DA applied to Transport Allowance' },
    { key: 6, component: 'National Pension System (NPS)', amount: results.npsDeduction, type: 'Deduction', desc: '10% of (Basic + DA) employee share' },
    { key: 7, component: 'State & Medical Insurance Taxes', amount: results.stateTaxes, type: 'Deduction', desc: 'Professional tax + health scheme CGHS / GIS' }
  ];

  const deductionPct = Math.round(((results.npsDeduction + results.stateTaxes) / results.gross) * 100) || 0;
  const inHandPct = 100 - deductionPct;

  return (
    <div className="max-w-6xl mx-auto py-24 px-4 min-h-screen">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
          <Calculator size={16} className="text-primary" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Pay Scale Matrix • Allowances Calculator</span>
        </div>
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">Sarkari Salary slabs</h1>
        <Paragraph className="!text-gray-400 text-lg">Calculate Gross Salary, NPS Deductions, Allowances & In-Hand Pay for Indian Government Exams.</Paragraph>
        
        <div className="mt-8 flex justify-center">
          <Radio.Group 
            value={calcMode} 
            onChange={e => setCalcMode(e.target.value)} 
            size="large"
            className="glass-card !p-1 !rounded-2xl border border-white/10"
          >
            <Radio.Button value="preset" className="!rounded-xl !h-10 !leading-8">State & Central Presets</Radio.Button>
            <Radio.Button value="custom" className="!rounded-xl !h-10 !leading-8">Custom Salary Calculator</Radio.Button>
          </Radio.Group>
        </div>
      </div>

      <Row gutter={[32, 32]}>
        {/* Controls Column */}
        <Col xs={24} lg={12}>
          <Card className="glass-card !p-8" title={<span className="text-white flex items-center gap-3 font-bold uppercase tracking-widest text-xs"><Coins size={16} className="text-primary"/> Salary Parameters</span>}>
            {calcMode === 'preset' ? (
              <Space direction="vertical" className="w-full" size="xl">
                <div>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Organization</Text>
                  <Select value={org} onChange={handleOrgChange} className="w-full" dropdownStyle={{ backgroundColor: '#1a1a1a' }}>
                    {Object.entries(PRESETS).map(([key, data]) => (
                      <Option key={key} value={key}>{data.name}</Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Select Post Profile</Text>
                  <Select value={postIndex} onChange={setPostIndex} className="w-full" dropdownStyle={{ backgroundColor: '#1a1a1a' }}>
                    {currentOrg.posts.map((post, idx) => (
                      <Option key={idx} value={idx}>
                        {post.title} (Level {post.level} - Basic ₹{post.basic.toLocaleString('en-IN')})
                      </Option>
                    ))}
                  </Select>
                  <Text className="text-gray-500 text-xs block mt-2">
                    {currentOrg.posts[postIndex]?.desc}
                  </Text>
                </div>

                {org !== 'jeevika' && (
                  <div>
                    <Text className="text-gray-400 font-bold block mb-3 uppercase text-[10px] tracking-widest">City Classification (HRA & TA)</Text>
                    <Radio.Group 
                      value={cityClass} 
                      onChange={e => setCityClass(e.target.value)}
                      className="w-full flex flex-col gap-2"
                    >
                      {CITY_CLASSES.map(c => (
                        <Radio key={c.value} value={c.value} className="text-white">
                          <span className="text-sm font-semibold">{c.label}</span>
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                )}
              </Space>
            ) : (
              <Space direction="vertical" className="w-full" size="xl">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Basic Pay (₹)</Text>
                    <InputNumber
                      min={10000}
                      max={250000}
                      value={customBasic}
                      onChange={setCustomBasic}
                      formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\₹\s?|(,*)/g, '')}
                      className="!w-36 !h-9 !rounded-lg"
                    />
                  </div>
                  <Slider 
                    min={15000} 
                    max={250000} 
                    step={100}
                    value={customBasic} 
                    onChange={setCustomBasic} 
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Dearness Allowance (DA %)</Text>
                    <Tag color="cyan">{customDA}%</Tag>
                  </div>
                  <Slider 
                    min={0} 
                    max={100} 
                    value={customDA} 
                    onChange={setCustomDA} 
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">House Rent Allowance (HRA %)</Text>
                    <Tag color="purple">{customHRA}%</Tag>
                  </div>
                  <Slider 
                    min={5} 
                    max={40} 
                    value={customHRA} 
                    onChange={setCustomHRA} 
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Transport Allowance (Base TA)</Text>
                    <Tag color="blue">₹{customTA}</Tag>
                  </div>
                  <Slider 
                    min={900} 
                    max={7200} 
                    step={900}
                    value={customTA} 
                    onChange={setCustomTA} 
                  />
                </div>
              </Space>
            )}

            <Divider className="border-white/5 !my-6" />

            <div>
              <Text className="text-gray-400 font-bold block mb-3 uppercase text-[10px] tracking-widest">Deductions Scheme</Text>
              <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div>
                  <Text className="text-white font-bold block text-sm">NPS (National Pension System)</Text>
                  <Text className="text-gray-500 text-xs">Deducts 10% of Basic Pay + Dearness Allowance (DA)</Text>
                </div>
                <Radio.Group 
                  value={includeNPS} 
                  onChange={e => setIncludeNPS(e.target.value)}
                  size="small"
                  className="bg-black/40 p-1 rounded-lg"
                >
                  <Radio.Button value={true}>Yes</Radio.Button>
                  <Radio.Button value={false}>No</Radio.Button>
                </Radio.Group>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3">
              <ShieldCheck size={20} className="text-primary shrink-0" />
              <Text className="text-gray-400 text-xs">
                All calculations align with standard Pay rules under the 7th Pay Commission pay slabs guidelines.
              </Text>
            </div>
          </Card>
        </Col>

        {/* Dashboard / Calculations Display */}
        <Col xs={24} lg={12}>
          <Card className="glass-card !p-8 relative overflow-hidden" title={<span className="text-white flex items-center gap-3 font-bold uppercase tracking-widest text-xs"><TrendingUp size={16} className="text-primary"/> Salary Dashboard</span>}>
            
            {/* Visual Ring and Net Salary display */}
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 mb-8">
              {/* Progress Ring */}
              <div className="relative w-36 h-36 flex items-center justify-center rounded-full bg-[#0d0722]">
                <Progress 
                  type="circle" 
                  percent={inHandPct} 
                  strokeWidth={10}
                  strokeColor={{
                    '0%': '#00f2ff',
                    '100%': '#7000ff',
                  }}
                  trailColor="rgba(239, 68, 68, 0.2)"
                  width={140}
                  showInfo={false}
                />
                <div className="absolute text-center">
                  <Text className="text-gray-500 uppercase text-[9px] font-black tracking-wider block">In-Hand Ratio</Text>
                  <span className="text-3xl font-black text-white">{inHandPct}%</span>
                </div>
              </div>

              {/* Major Numbers */}
              <div className="flex-1 text-center sm:text-left">
                <div className="mb-4">
                  <Text className="text-gray-500 uppercase text-[10px] font-black tracking-widest block mb-1">Gross Salary (Monthly)</Text>
                  <span className="text-2xl font-bold text-gray-300">₹{results.gross.toLocaleString('en-IN')}</span>
                </div>

                <div>
                  <Text className="text-primary uppercase text-[10px] font-black tracking-widest block mb-1">Net In-Hand Salary</Text>
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent drop-shadow-[0_0_20px_rgba(0,242,255,0.25)]">
                    ₹{results.netInHand.toLocaleString('en-IN')}
                  </span>
                  <Text className="text-gray-500 text-xs block mt-1">Cash Credited in Bank Account</Text>
                </div>
              </div>
            </div>

            {/* Deductions and NPS alert */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-2xl text-center">
                <Text className="text-gray-500 uppercase text-[9px] font-black tracking-widest block mb-1">Total Deductions</Text>
                <span className="text-xl font-bold text-red-400">₹{(results.npsDeduction + results.stateTaxes).toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-green-500/5 border border-green-500/10 p-4 rounded-2xl text-center">
                <Text className="text-gray-500 uppercase text-[9px] font-black tracking-widest block mb-1">Govt NPS Share (14%)</Text>
                <span className="text-xl font-bold text-green-400">₹{results.govtNpsContribution.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Divider className="border-white/5 !my-4" />

            <div className="mb-6">
              <span className="text-white text-xs font-bold uppercase tracking-widest block mb-3">Itemized Component Breakdown</span>
              <Table 
                dataSource={tableData} 
                columns={columns} 
                pagination={false} 
                size="small"
                className="custom-table"
                rowClassName="hover:bg-white/[0.02] border-white/5"
              />
            </div>

            {/* General Pay Rules Guide */}
            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
              <div className="flex gap-2 items-center mb-2">
                <AlertCircle size={16} className="text-accent" />
                <Text className="text-white font-bold text-xs uppercase tracking-wider">Salary Rules & Terms</Text>
              </div>
              <Paragraph className="!text-gray-500 text-[11px] !mb-0 leading-relaxed">
                • **Dearness Allowance (DA)**: Adjusted periodically by government based on inflation (currently calculated at 50%).<br />
                • **HRA Classes**: X Class cities (population &gt; 50 lakhs) get 30%, Y Class (population 5 to 50 lakhs) get 20%, Z Class (population &lt; 5 lakhs) get 10%.<br />
                • **NPS Deductions**: Mandatory contribution (10% of Basic+DA), while Government adds an extra 14% to your pension account.
              </Paragraph>
            </div>

          </Card>
        </Col>
      </Row>
    </div>
  );
}
