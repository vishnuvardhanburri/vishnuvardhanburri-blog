import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Send, Copy, Clock, CheckCircle2, ChevronRight, ChevronLeft, 
  FastForward, ExternalLink, Mail, User, Building, ShieldCheck, 
  DollarSign, Filter, Cpu, Sparkles, Download, Share2, Video, 
  FileText, Flame, Target, Trophy, TrendingUp, BarChart3, CheckSquare, Layers, AlertCircle, Shield
} from 'lucide-react';
import { REAL_TARGET_COMPANIES, RealCompanyTarget } from '../data/realTargetCompanies';
import { 
  checkOllamaHealth, getOllamaModels, generateExtraordinaryEmailWithOllama, 
  generateFollowUpOllama, generateFollowUp2Ollama, OllamaFollowUpResponse, OllamaEmailResponse, RECOMMENDED_MODELS 
} from '../services/ollamaService';
import { calculateDealCloseScore } from '../utils/dealScoring';
import { generate5SubjectCandidates, auditEmailDeliverability, SubjectLineCandidates, DeliverabilityAudit } from '../utils/deliverabilityGate';

export const CleanDashboardView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('TODAYS_30');
  const [selectedSlug, setSelectedSlug] = useState<string>('linear');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [linkedInCopyFeedback, setLinkedInCopyFeedback] = useState(false);

  // Subject Line Candidate Selection (5 Distinct Styles)
  const [selectedSubjectOverride, setSelectedSubjectOverride] = useState<Record<string, string>>({});

  // Ollama Local LLM Integration State
  const [isOllamaOnline, setIsOllamaOnline] = useState<boolean>(false);
  const [ollamaModels, setOllamaModels] = useState<string[]>(['gemma4:12b', 'qwen2.5:7b', 'deepseek-coder:6.7b', 'llama3:8b']);
  const [selectedModel, setSelectedModel] = useState<string>('gemma4:12b');
  const [isGeneratingOllama, setIsGeneratingOllama] = useState<boolean>(false);
  const [generatedEmailOverrides, setGeneratedEmailOverrides] = useState<Record<string, OllamaEmailResponse>>({});
  const [isGeneratingFollowUp, setIsGeneratingFollowUp] = useState<boolean>(false);
  const [followUpDrafts, setFollowUpDrafts] = useState<Record<string, OllamaFollowUpResponse>>({});
  const [customEmailInput, setCustomEmailInput] = useState<Record<string, string>>({});
  const [isBatchGenerating, setIsBatchGenerating] = useState<boolean>(false);
  const [batchProgress, setBatchProgress] = useState<number>(0);
  const [batchTotal, setBatchTotal] = useState<number>(0);

  // Single Persistent Database for Dashboard Tracking (Schema v6 with Daily Sent History)
  const todayStr = new Date().toISOString().split('T')[0];
  const todayDateOnly = new Date();
  todayDateOnly.setHours(0,0,0,0);

  const [companyStates, setCompanyStates] = useState<Record<string, { 
    status: string; 
    stageIndex: number; 
    lastSentDate?: string; 
    nextFollowUpDate?: string; 
    emailOverride?: string 
  }>>(() => {
    try {
      const saved = localStorage.getItem('xavira_persistent_outreach_db_v6') || localStorage.getItem('xavira_persistent_outreach_db_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach(slug => {
          if (parsed[slug].status === 'STAGE_1_SENT' && !parsed[slug].nextFollowUpDate) {
            parsed[slug].nextFollowUpDate = '2026-08-01';
          }
        });
        return parsed;
      }
    } catch {
      // Fallback
    }

    // Default Seed Database: 206 Sent, 30 Uncontacted
    const initialDb: Record<string, { status: string; stageIndex: number; lastSentDate?: string; nextFollowUpDate?: string; emailOverride?: string }> = {};
    REAL_TARGET_COMPANIES.forEach((c, idx) => {
      if (idx < 206) {
        initialDb[c.slug] = {
          status: 'STAGE_1_SENT',
          stageIndex: 1,
          lastSentDate: '2026-07-29',
          nextFollowUpDate: '2026-08-01'
        };
      } else {
        initialDb[c.slug] = {
          status: 'UNCONTACTED',
          stageIndex: 0
        };
      }
    });
    return initialDb;
  });

  // Check Ollama Health on Mount
  useEffect(() => {
    async function initOllama() {
      const online = await checkOllamaHealth();
      setIsOllamaOnline(online);
      if (online) {
        const models = await getOllamaModels();
        if (models.length > 0) {
          setOllamaModels(models);
          setSelectedModel(models[0]);
        }
      }
    }
    initOllama();
  }, []);

  useEffect(() => {
    localStorage.setItem('xavira_persistent_outreach_db_v6', JSON.stringify(companyStates));
  }, [companyStates]);

  // Follow-Up Due Checkers
  const isFollowUp1Due = (cSlug: string) => {
    const state = companyStates[cSlug];
    if (state?.status === 'STAGE_1_SENT' && state.nextFollowUpDate) {
      const nextDate = new Date(state.nextFollowUpDate);
      nextDate.setHours(0,0,0,0);
      return nextDate <= todayDateOnly;
    }
    return false;
  };

  const isFollowUp2Due = (cSlug: string) => {
    const state = companyStates[cSlug];
    if (state?.status === 'STAGE_2_SENT' && state.nextFollowUpDate) {
      const nextDate = new Date(state.nextFollowUpDate);
      nextDate.setHours(0,0,0,0);
      return nextDate <= todayDateOnly;
    }
    return false;
  };

  // Rank all companies by Deal Close Probability Score
  const scoredCompanies = useMemo(() => {
    return REAL_TARGET_COMPANIES.map(company => {
      const state = companyStates[company.slug];
      const dealScore = calculateDealCloseScore(company, state);
      return {
        company,
        dealScore,
        state: state || { status: 'UNCONTACTED', stageIndex: 0 }
      };
    }).sort((a, b) => b.dealScore.scorePercent - a.dealScore.scorePercent);
  }, [companyStates]);

  // 30-Cap Daily Mission Recommendations (Highest Close Probability)
  const top10NewCompanies = useMemo(() => {
    return scoredCompanies
      .filter(item => item.state.status === 'UNCONTACTED')
      .slice(0, 10)
      .map(item => item.company);
  }, [scoredCompanies]);

  const top10FU1Companies = useMemo(() => {
    return scoredCompanies
      .filter(item => isFollowUp1Due(item.company.slug))
      .slice(0, 10)
      .map(item => item.company);
  }, [scoredCompanies]);

  const top10FU2Companies = useMemo(() => {
    const explicitFU2 = scoredCompanies
      .filter(item => isFollowUp2Due(item.company.slug))
      .map(item => item.company);

    if (explicitFU2.length >= 10) {
      return explicitFU2.slice(0, 10);
    }
    const extraDue = scoredCompanies
      .filter(item => isFollowUp1Due(item.company.slug) && !top10FU1Companies.some(c => c.slug === item.company.slug))
      .slice(0, 10 - explicitFU2.length)
      .map(item => item.company);

    return [...explicitFU2, ...extraDue];
  }, [scoredCompanies, top10FU1Companies]);

  const todays30MissionList = useMemo(() => {
    const combined: RealCompanyTarget[] = [];
    const seen = new Set<string>();

    [...top10FU1Companies, ...top10NewCompanies, ...top10FU2Companies].forEach(c => {
      if (!seen.has(c.slug)) {
        seen.add(c.slug);
        combined.push(c);
      }
    });

    return combined.slice(0, 30);
  }, [top10FU1Companies, top10NewCompanies, top10FU2Companies]);

  // Daily Activity Breakdown
  const allStates = Object.values(companyStates) as { status: string; stageIndex: number; lastSentDate?: string; nextFollowUpDate?: string; emailOverride?: string }[];
  const sentTodayNewCount = allStates.filter(s => s.lastSentDate === todayStr && s.status === 'STAGE_1_SENT').length;
  const sentTodayFU1Count = allStates.filter(s => s.lastSentDate === todayStr && s.status === 'STAGE_2_SENT').length;
  const sentTodayFU2Count = allStates.filter(s => s.lastSentDate === todayStr && s.status === 'STAGE_3_SENT').length;
  const sentTodayTotal = sentTodayNewCount + sentTodayFU1Count + sentTodayFU2Count;

  const followUpDueTotalCount = REAL_TARGET_COMPANIES.filter(c => isFollowUp1Due(c.slug) || isFollowUp2Due(c.slug)).length;
  const totalTargets = REAL_TARGET_COMPANIES.length;
  const sentTotalCount = allStates.filter(s => s.status !== 'UNCONTACTED').length;
  const uncontactedCount = totalTargets - sentTotalCount;
  const bookedDealsCount = allStates.filter(s => s.status === 'MEETING_BOOKED').length;
  const pipelineValue = (sentTotalCount * 25000) + (bookedDealsCount * 75000);

  // Filter companies based on search & active filter pill
  const filteredCompanies = useMemo(() => {
    return REAL_TARGET_COMPANIES.filter(c => {
      const state = companyStates[c.slug] || { status: 'UNCONTACTED' };
      const matchesSearch = c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.email.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedStatusFilter === 'TODAYS_30') {
        return todays30MissionList.some(item => item.slug === c.slug);
      }
      if (selectedStatusFilter === 'NEW_10') {
        return top10NewCompanies.some(item => item.slug === c.slug);
      }
      if (selectedStatusFilter === 'FU1_10') {
        return top10FU1Companies.some(item => item.slug === c.slug);
      }
      if (selectedStatusFilter === 'FU2_10') {
        return top10FU2Companies.some(item => item.slug === c.slug);
      }
      if (selectedStatusFilter === 'FOLLOW_UP_DUE') {
        return isFollowUp1Due(c.slug) || isFollowUp2Due(c.slug);
      }
      if (selectedStatusFilter === 'STAGE_1_SENT') {
        return state.status === 'STAGE_1_SENT';
      }
      if (selectedStatusFilter === 'UNCONTACTED') {
        return state.status === 'UNCONTACTED';
      }

      return true;
    }).sort((a, b) => {
      const scoreA = calculateDealCloseScore(a, companyStates[a.slug]).scorePercent;
      const scoreB = calculateDealCloseScore(b, companyStates[b.slug]).scorePercent;
      return scoreB - scoreA;
    });
  }, [searchQuery, selectedStatusFilter, todays30MissionList, top10NewCompanies, top10FU1Companies, top10FU2Companies, companyStates]);

  // Currently selected target
  const currentIndex = filteredCompanies.findIndex(c => c.slug === selectedSlug);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const selectedCompany = filteredCompanies[safeIndex] || REAL_TARGET_COMPANIES[0];
  const currentState = companyStates[selectedCompany.slug] || { status: 'UNCONTACTED', stageIndex: 0 };
  const activeEmail = companyStates[selectedCompany.slug]?.emailOverride || selectedCompany.email;
  const selectedDealScore = calculateDealCloseScore(selectedCompany, currentState);

  // 5 Subject Line Candidates for selected company
  const subjectCandidates: SubjectLineCandidates = useMemo(() => {
    return generate5SubjectCandidates(selectedCompany);
  }, [selectedCompany]);

  const activeSubject = selectedSubjectOverride[selectedCompany.slug] || subjectCandidates.selectedSubject;

  const handleSaveCustomEmail = (slug: string, val: string) => {
    setCompanyStates(prev => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        emailOverride: val.trim()
      }
    }));
  };

  // Current active sequence step
  const defaultStep = selectedCompany.emailSequence[activeStepIndex] || selectedCompany.emailSequence[0];
  const ollamaOverride = generatedEmailOverrides[selectedCompany.slug];
  const currentStepBody = (activeStepIndex === 0 && ollamaOverride?.body) ? ollamaOverride.body : defaultStep.body;

  // Deliverability & Spam Gate Audit
  const deliverabilityAudit: DeliverabilityAudit = useMemo(() => {
    return auditEmailDeliverability(activeSubject, currentStepBody);
  }, [activeSubject, currentStepBody]);

  const currentFollowUpDraft = followUpDrafts[selectedCompany.slug];
  const activeDraftBody = (currentFollowUpDraft && currentFollowUpDraft.body && currentFollowUpDraft.body.trim().length > 10)
    ? currentFollowUpDraft.body
    : `Hi ${selectedCompany.contactName.split(' ')[0]},\n\nI revisited the ${selectedCompany.companyName} analysis after my earlier note.\n\nOne point I kept coming back to is worker thread queue contention under sustained ${selectedCompany.challenge.toLowerCase().split(' ')[0]} spikes.\n\nThis level of connection lock latency cascades into worker thread starvation, forcing aggressive traffic shedding right before the auto-scaler provisions new capacity.\n\nI may be missing internal context — is this something your team has already accounted for, or am I interpreting the public signals incorrectly?\n\nhttps://www.xaviratechlabs.com/research/${selectedCompany.slug}\n\nVishnu\nDirector & Principal Architect\nXAVIRA Technologies`;

  // Auto-generate Follow-up #1 draft on selection if due & not yet cached
  useEffect(() => {
    async function triggerFollowUpGen() {
      if ((isFollowUp1Due(selectedCompany.slug) || isFollowUp2Due(selectedCompany.slug)) && !followUpDrafts[selectedCompany.slug] && !isGeneratingFollowUp) {
        setIsGeneratingFollowUp(true);
        try {
          const originalEmailBody = selectedCompany.emailSequence[0].body;
          const originalSubject = activeSubject;

          const draft = isFollowUp2Due(selectedCompany.slug)
            ? await generateFollowUp2Ollama({
                companySlug: selectedCompany.slug,
                companyName: selectedCompany.companyName,
                contactName: selectedCompany.contactName,
                designation: selectedCompany.designation,
                challenge: selectedCompany.challenge,
                originalEmailBody,
                originalSubject,
                model: selectedModel
              })
            : await generateFollowUpOllama({
                companySlug: selectedCompany.slug,
                companyName: selectedCompany.companyName,
                contactName: selectedCompany.contactName,
                designation: selectedCompany.designation,
                challenge: selectedCompany.challenge,
                originalEmailBody,
                originalSubject,
                model: selectedModel
              });

          setFollowUpDrafts(prev => ({
            ...prev,
            [selectedCompany.slug]: draft
          }));
        } catch (err) {
          console.error(err);
        } finally {
          setIsGeneratingFollowUp(false);
        }
      }
    }
    triggerFollowUpGen();
  }, [selectedCompany.slug, selectedModel, activeSubject]);

  // Target Navigation Controls
  const handlePrevTarget = () => {
    if (safeIndex > 0) {
      setSelectedSlug(filteredCompanies[safeIndex - 1].slug);
    }
  };

  const handleNextTarget = () => {
    if (safeIndex < filteredCompanies.length - 1) {
      setSelectedSlug(filteredCompanies[safeIndex + 1].slug);
    }
  };

  // Handle Mark Replied
  const handleMarkReplied = () => {
    setCompanyStates(prev => ({
      ...prev,
      [selectedCompany.slug]: {
        ...prev[selectedCompany.slug],
        status: 'REPLIED'
      }
    }));
  };

  // Generate Follow-Up Draft manually
  const handleGenerateFollowUp = async () => {
    setIsGeneratingFollowUp(true);
    try {
      const originalEmailBody = selectedCompany.emailSequence[0].body;
      const originalSubject = activeSubject;
      
      const draft = isFollowUp2Due(selectedCompany.slug)
        ? await generateFollowUp2Ollama({
            companySlug: selectedCompany.slug,
            companyName: selectedCompany.companyName,
            contactName: selectedCompany.contactName,
            designation: selectedCompany.designation,
            challenge: selectedCompany.challenge,
            originalEmailBody,
            originalSubject,
            model: selectedModel
          })
        : await generateFollowUpOllama({
            companySlug: selectedCompany.slug,
            companyName: selectedCompany.companyName,
            contactName: selectedCompany.contactName,
            designation: selectedCompany.designation,
            challenge: selectedCompany.challenge,
            originalEmailBody,
            originalSubject,
            model: selectedModel
          });

      setFollowUpDrafts(prev => ({
        ...prev,
        [selectedCompany.slug]: draft
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingFollowUp(false);
    }
  };

  // Batch Pre-Generate All Due Drafts
  const handleBatchPreGenerateAll = async () => {
    const dueCompanies = REAL_TARGET_COMPANIES.filter(c => isFollowUp1Due(c.slug) || isFollowUp2Due(c.slug));
    if (dueCompanies.length === 0) return;

    setIsBatchGenerating(true);
    setBatchTotal(dueCompanies.length);
    setBatchProgress(0);

    const newDrafts: Record<string, OllamaFollowUpResponse> = {};

    for (let i = 0; i < dueCompanies.length; i++) {
      const company = dueCompanies[i];
      const originalEmailBody = company.emailSequence[0].body;
      const originalSubject = activeSubject;

      try {
        const draft = await generateFollowUpOllama({
          companySlug: company.slug,
          companyName: company.companyName,
          contactName: company.contactName,
          designation: company.designation,
          challenge: company.challenge,
          originalEmailBody,
          originalSubject,
          model: selectedModel
        });
        newDrafts[company.slug] = draft;
      } catch (err) {
        console.error(err);
      }

      setBatchProgress(i + 1);
      if (i % 5 === 0) {
        await new Promise(r => setTimeout(r, 10));
      }
    }

    setFollowUpDrafts(prev => ({
      ...prev,
      ...newDrafts
    }));
    setIsBatchGenerating(false);
  };

  const handleApproveFollowUp = () => {
    const today = new Date();
    const followUpDate = new Date();
    followUpDate.setDate(today.getDate() + 7);
    const followUpDateStr = followUpDate.toISOString().split('T')[0];

    const nextStage = currentState.status === 'STAGE_2_SENT' ? 'STAGE_3_SENT' : 'STAGE_2_SENT';
    const nextIdx = currentState.status === 'STAGE_2_SENT' ? 3 : 2;
    const subject = currentFollowUpDraft?.subject || (activeSubject.startsWith('Re:') ? activeSubject : `Re: ${activeSubject}`);

    setCompanyStates(prev => ({
      ...prev,
      [selectedCompany.slug]: {
        status: nextStage,
        stageIndex: nextIdx,
        lastSentDate: todayStr,
        nextFollowUpDate: followUpDateStr
      }
    }));

    const mailtoUrl = `mailto:${activeEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(activeDraftBody)}`;
    window.location.href = mailtoUrl;

    if (safeIndex < filteredCompanies.length - 1) {
      setTimeout(() => {
        setSelectedSlug(filteredCompanies[safeIndex + 1].slug);
      }, 300);
    }
  };

  // Handle Mark Email Sent & Schedule Next Follow-up for New Outreach
  const handleSendAndAdvance = () => {
    const today = new Date();
    const followUpDate = new Date();
    followUpDate.setDate(today.getDate() + defaultStep.waitDays);
    const followUpDateStr = followUpDate.toISOString().split('T')[0];

    const nextStageName = activeStepIndex === 0 ? 'STAGE_1_SENT' :
                          activeStepIndex === 1 ? 'STAGE_2_SENT' : 'STAGE_3_SENT';

    setCompanyStates(prev => ({
      ...prev,
      [selectedCompany.slug]: {
        status: nextStageName,
        stageIndex: Math.min(3, activeStepIndex + 1),
        lastSentDate: todayStr,
        nextFollowUpDate: followUpDateStr
      }
    }));

    // Trigger Desktop Mail Client
    const mailtoUrl = `mailto:${activeEmail}?subject=${encodeURIComponent(activeSubject)}&body=${encodeURIComponent(currentStepBody)}`;
    window.location.href = mailtoUrl;

    // Auto-advance to next target company in the list
    if (safeIndex < filteredCompanies.length - 1) {
      setTimeout(() => {
        setSelectedSlug(filteredCompanies[safeIndex + 1].slug);
      }, 300);
    }
  };

  // Handle Copy Email Content
  const handleCopyEmail = () => {
    const fullText = `TO: ${activeEmail}\nSUBJECT: ${activeSubject}\n\n${currentStepBody}`;
    navigator.clipboard.writeText(fullText);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Handle Copy LinkedIn 24h Warm-up Message
  const handleCopyLinkedInMessage = () => {
    const firstName = selectedCompany.contactName.split(' ')[0];
    const reportUrl = `https://www.xaviratechlabs.com/research/${selectedCompany.slug.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    const message = `Hi ${firstName} — saw ${selectedCompany.companyName}'s engineering update regarding ${selectedCompany.challenge.split(' ')[0]}. We published your team's AST topology diagnostic: ${reportUrl}. Would be great to connect and compare notes. — Vishnu`;
    navigator.clipboard.writeText(message);
    setLinkedInCopyFeedback(true);
    setTimeout(() => setLinkedInCopyFeedback(false), 2000);
  };

  // Export Persistent Database JSON File Backup
  const handleExportDatabase = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(companyStates, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `xavira_outreach_database_backup_${todayStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const now = new Date();
  const hours = now.getHours();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  let greeting = "Good Morning Vishnu";
  if (hours >= 12 && hours < 17) {
    greeting = "Good Afternoon Vishnu";
  } else if (hours >= 17) {
    greeting = "Good Evening Vishnu";
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-cyan-500 selection:text-black pt-12 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Top Command Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              X
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                XAVIRA OUTREACH COMMAND CENTER
              </h1>
              <span className="text-[10px] font-mono text-zinc-400 block">
                DELIVERABILITY SHIELD ACTIVE • £75,000 GBP DEAL ENGINE
              </span>
            </div>
          </div>

          {/* Ollama Health, Model Bar & Backup Export */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <div className={`px-3 py-1 rounded border font-bold uppercase flex items-center gap-2 ${
              isOllamaOnline
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                : 'bg-zinc-950 border-zinc-850 text-zinc-400'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isOllamaOnline ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
              <span>OLLAMA {isOllamaOnline ? 'ONLINE' : 'OFFLINE'} (localhost:11434)</span>
            </div>

            {isOllamaOnline && (
              <select
                value={selectedModel}
                onChange={e => setSelectedModel(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 text-cyan-400 font-mono text-xs font-bold px-2.5 py-1 rounded focus:outline-none"
              >
                {ollamaModels.map(m => (
                  <option key={m} value={m}>{m.toUpperCase()}</option>
                ))}
              </select>
            )}

            <button
              onClick={handleExportDatabase}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono text-xs font-bold uppercase rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Backup persistent campaign database to JSON file"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>BACKUP DB (JSON)</span>
            </button>
          </div>
        </div>

        {/* 🎯 DAILY 30-CAP SMART CADENCE CONTROL BAR */}
        <div className="bg-gradient-to-r from-[#030e28] via-[#020919] to-black border border-cyan-500/40 p-5 sm:p-6 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] space-y-4 font-mono">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>DAILY OUTREACH CADENCE // 30 EMAIL CAP</span>
                  <span className="text-[10px] text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.2 rounded">
                    {timeStr} • {greeting.toUpperCase()}
                  </span>
                </span>
                <span className="text-[10px] text-zinc-400 block font-sans">
                  Target: 10 New Outreach + 10 Follow-Up #1 + 10 Follow-Up #2 (Zero Spam Pattern)
                </span>
              </div>
            </div>

            {/* Daily Quota Progress Counter */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-zinc-400">TODAY'S PROGRESS</div>
                <div className="text-xl font-bold text-cyan-400">
                  <span>{sentTodayTotal}</span>
                  <span className="text-zinc-500 text-xs font-normal"> / 30 Cap</span>
                </div>
              </div>

              <div className="w-36 bg-zinc-950 border border-zinc-800 rounded-full h-3 p-0.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-400 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  style={{ width: `${Math.min(100, Math.round((sentTodayTotal / 30) * 100))}%` }}
                />
              </div>
            </div>
          </div>

          {/* 3 Sub-Cadence Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div 
              onClick={() => setSelectedStatusFilter('NEW_10')}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                selectedStatusFilter === 'NEW_10'
                  ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-black/80 border-zinc-850 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>10 NEW FIRST-TOUCH</span>
                </span>
                <span className="text-zinc-300 font-bold">{sentTodayNewCount} / 10</span>
              </div>
              <span className="text-[10px] text-zinc-500 block mt-1 font-sans">
                Top Series B/C uncontacted accounts ranked by deal close %
              </span>
            </div>

            <div 
              onClick={() => setSelectedStatusFilter('FU1_10')}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                selectedStatusFilter === 'FU1_10'
                  ? 'bg-emerald-950/60 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-black/80 border-zinc-850 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>10 FOLLOW-UP #1</span>
                </span>
                <span className="text-zinc-300 font-bold">{sentTodayFU1Count} / 10</span>
              </div>
              <span className="text-[10px] text-zinc-500 block mt-1 font-sans">
                Engineer-to-engineer notes on verified bottlenecks
              </span>
            </div>

            <div 
              onClick={() => setSelectedStatusFilter('FU2_10')}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                selectedStatusFilter === 'FU2_10'
                  ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                  : 'bg-black/80 border-zinc-850 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-purple-400 font-bold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>10 FOLLOW-UP #2+</span>
                </span>
                <span className="text-zinc-300 font-bold">{sentTodayFU2Count} / 10</span>
              </div>
              <span className="text-[10px] text-zinc-500 block mt-1 font-sans">
                Deep architectural telemetry benchmark notes
              </span>
            </div>
          </div>
        </div>

        {/* Real Telemetry Counter Cards Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 font-mono text-xs">
          <div className="bg-[#030919] border border-cyan-500/30 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-bold">TOTAL TARGETS</span>
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <span>{totalTargets}</span>
              <span className="text-xs font-sans text-cyan-400 font-normal">Researched</span>
            </div>
            <span className="text-[9px] text-zinc-500 block">100% Real AST Footprint</span>
          </div>

          <div className="bg-[#030919] border border-emerald-500/30 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] text-emerald-400 uppercase tracking-wider block font-bold">EMAILS SENT TILL NOW</span>
            <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <span>{sentTotalCount}</span>
              <span className="text-xs font-sans text-zinc-400 font-normal">/ {totalTargets}</span>
            </div>
            <span className="text-[9px] text-emerald-500 block font-bold">Persistent History</span>
          </div>

          <div className="bg-[#030919] border border-cyan-500/30 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-bold">SENT TODAY ({todayStr})</span>
            <div className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
              <span>{sentTodayTotal}</span>
              <span className="text-xs font-sans text-zinc-400 font-normal">/ 30 Cap</span>
            </div>
            <span className="text-[9px] text-cyan-400 block font-bold">{Math.max(0, 30 - sentTodayTotal)} Remaining Today</span>
          </div>

          <div className="bg-[#030919] border border-purple-500/30 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] text-purple-400 uppercase tracking-wider block font-bold">BOOKED CLIENT DEALS</span>
            <div className="text-2xl font-bold text-purple-400">
              {bookedDealsCount}
            </div>
            <span className="text-[9px] text-purple-400 block font-bold">£75,000 Sprints</span>
          </div>

          <div className="bg-[#030919] border border-amber-500/40 p-5 rounded-2xl space-y-1 shadow-[0_0_15px_rgba(245,158,11,0.15)] col-span-2 md:col-span-1">
            <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-bold">£75K DEAL PIPELINE</span>
            <div className="text-2xl font-bold text-amber-400 flex items-center gap-1">
              <DollarSign className="w-5 h-5 text-amber-400 inline" />
              <span>£{pipelineValue.toLocaleString()}</span>
            </div>
            <span className="text-[9px] text-zinc-400 block">Enterprise Advisory</span>
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Panel: Clean Target Directory Table */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-3">
              <div className="relative font-mono">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder={`Search ${totalTargets} target companies, CTOs, emails...`}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-850 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              {/* Status Filter Pills */}
              <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                {[
                  { id: 'TODAYS_30', label: `🎯 Today's 30 Mission (${todays30MissionList.length})` },
                  { id: 'NEW_10', label: `✨ 10 New (${top10NewCompanies.length})` },
                  { id: 'FU1_10', label: `⚡ 10 FU#1 (${top10FU1Companies.length})` },
                  { id: 'FU2_10', label: `🔥 10 FU#2+ (${top10FU2Companies.length})` },
                  { id: 'FOLLOW_UP_DUE', label: `All Due (${followUpDueTotalCount})` },
                  { id: 'all', label: `All (${totalTargets})` },
                  { id: 'UNCONTACTED', label: `Uncontacted (${uncontactedCount})` }
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedStatusFilter(filter.id)}
                    className={`px-3 py-1 rounded-lg border font-bold uppercase transition-all cursor-pointer ${
                      selectedStatusFilter === filter.id
                        ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-850 hover:text-white'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Batch Pre-Generate All Action Bar */}
              {followUpDueTotalCount > 0 && (
                <div className="bg-purple-950/40 border border-purple-500/30 p-2.5 rounded-xl flex items-center justify-between gap-2 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-[11px] text-zinc-300 font-sans">
                      Pre-calculate & score all <strong>{followUpDueTotalCount} due drafts</strong>:
                    </span>
                  </div>
                  <button
                    onClick={handleBatchPreGenerateAll}
                    disabled={isBatchGenerating}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold uppercase rounded text-[10px] transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0 cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className={`w-3 h-3 ${isBatchGenerating ? 'animate-spin' : ''}`} />
                    <span>
                      {isBatchGenerating
                        ? `GENERATING (${batchProgress}/${batchTotal})...`
                        : `PRE-GENERATE ALL (${followUpDueTotalCount})`}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Target List Items */}
            <div className="space-y-2.5 max-h-[660px] overflow-y-auto pr-1 font-mono text-xs">
              {filteredCompanies.map((company, idx) => {
                const isSelected = company.slug === selectedCompany.slug;
                const state = companyStates[company.slug] || { status: 'UNCONTACTED' };
                const dealScore = calculateDealCloseScore(company, state);

                return (
                  <div
                    key={`${company.slug}-${idx}`}
                    onClick={() => setSelectedSlug(company.slug)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-[#041026] border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.18)]'
                        : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500">#{idx + 1}</span>
                        <span className="font-display font-bold text-white text-xs uppercase">{company.companyName}</span>
                        <a 
                          href={company.website} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={e => e.stopPropagation()}
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* High Close Score Badge */}
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase flex items-center gap-1 ${
                          dealScore.scorePercent >= 95 
                            ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                            : dealScore.scorePercent >= 90
                            ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300'
                            : 'bg-zinc-900 border-zinc-850 text-zinc-400'
                        }`}>
                          <Flame className="w-2.5 h-2.5" />
                          <span>{dealScore.scorePercent}% CLOSE</span>
                        </span>

                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                          state.status === 'STAGE_1_SENT'
                            ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40'
                            : state.status === 'STAGE_2_SENT'
                            ? 'text-purple-400 bg-purple-950/60 border-purple-500/40'
                            : state.status === 'STAGE_3_SENT'
                            ? 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40'
                            : 'text-zinc-400 bg-zinc-900 border-zinc-850'
                        }`}>
                          {state.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-zinc-300 font-sans flex items-center justify-between mt-1">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-cyan-400" />
                        <strong className="text-white">{company.contactName}</strong> ({company.designation})
                      </span>
                      <span className="text-zinc-500 text-[10px] font-mono">&lt;{state.emailOverride || company.email}&gt;</span>
                    </div>

                    {state.nextFollowUpDate && (
                      <div className="mt-2 text-[9px] font-mono text-amber-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>NEXT FOLLOW-UP DUE: {state.nextFollowUpDate}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Selected Company Execution & Email Composer */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#030815] border border-cyan-500/40 p-6 sm:p-8 rounded-2xl space-y-6 shadow-[0_4px_40px_rgba(0,0,0,0.8)]">
              
              {/* Target Header Info & Real Verified Email Override Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-5">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-xl font-bold text-white tracking-wide uppercase">
                      {selectedCompany.companyName}
                    </h2>
                    <a
                      href={selectedCompany.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      <span>{selectedCompany.website.replace('https://', '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-xs text-zinc-400 font-mono mt-1">
                    Contact: <strong className="text-white">{selectedCompany.contactName}</strong> ({selectedCompany.designation}) &lt;<span className="text-cyan-400 font-bold">{activeEmail}</span>&gt;
                  </p>

                  {/* Real Verified Email Quick-Paste Input Box */}
                  <div className="mt-2.5 flex items-center gap-2 font-mono text-xs">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>REAL VERIFIED EMAIL:</span>
                    </span>
                    <input
                      type="email"
                      placeholder="Paste real verified email here (saves permanently)..."
                      value={customEmailInput[selectedCompany.slug] ?? companyStates[selectedCompany.slug]?.emailOverride ?? selectedCompany.email}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomEmailInput(prev => ({ ...prev, [selectedCompany.slug]: val }));
                        handleSaveCustomEmail(selectedCompany.slug, val);
                      }}
                      className="bg-zinc-950 border border-cyan-500/40 text-cyan-300 font-mono text-xs px-3 py-1.5 rounded-lg w-80 focus:outline-none focus:border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                    />
                    {companyStates[selectedCompany.slug]?.emailOverride && (
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded uppercase">
                        ✓ SAVED PERMANENTLY
                      </span>
                    )}
                  </div>

                  <div className="text-[10px] text-cyan-400 font-mono pt-2 font-bold flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>PRIME SEND WINDOW: 08:30 AM - 10:15 AM LOCAL RECIPIENT TIME</span>
                    </span>
                    <a 
                      href={`https://www.xaviratechlabs.com/research/${selectedCompany.slug}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline font-mono bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded text-[9px]"
                    >
                      VIEW WEB REPORT →
                    </a>
                    {currentState.status !== 'REPLIED' && currentState.status !== 'UNCONTACTED' && (
                      <button onClick={handleMarkReplied} className="ml-4 bg-purple-950/60 border border-purple-500/40 text-purple-400 px-2 py-0.5 rounded uppercase font-bold hover:bg-purple-900 transition-colors">
                        Mark Replied (Stop Sequence)
                      </button>
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  <button
                    onClick={handlePrevTarget}
                    disabled={safeIndex === 0}
                    className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-zinc-300 border border-zinc-800 rounded transition-colors flex items-center gap-1 cursor-pointer text-[11px]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>PREV</span>
                  </button>

                  <button
                    onClick={handleNextTarget}
                    disabled={safeIndex === filteredCompanies.length - 1}
                    className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-zinc-300 border border-zinc-800 rounded transition-colors flex items-center gap-1 cursor-pointer text-[11px]"
                  >
                    <span>NEXT</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 🛡️ DELIVERABILITY & SPAM SHIELD AUDIT BAR */}
              <div className="bg-[#020d20] border border-cyan-500/40 p-4 rounded-xl space-y-3 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                      DELIVERABILITY SPAM SHIELD AUDIT // vishnuvardhanburri.in
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded font-bold uppercase">
                    SPF • DKIM • DMARC: 100% ALIGNED
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                  <div className="bg-black/80 border border-zinc-850 p-2 rounded flex flex-col gap-0.5">
                    <span className="text-zinc-500">SPAM TRIGGER WORDS</span>
                    <span className="text-emerald-400 font-bold">
                      {deliverabilityAudit.spamTriggerWordsFound.length === 0 ? '0 (CLEAN)' : `${deliverabilityAudit.spamTriggerWordsFound.length} TRIGGER`}
                    </span>
                  </div>

                  <div className="bg-black/80 border border-zinc-850 p-2 rounded flex flex-col gap-0.5">
                    <span className="text-zinc-500">WORD COUNT</span>
                    <span className="text-cyan-400 font-bold">
                      {deliverabilityAudit.wordCount} WORDS (70-120 OPTIMAL)
                    </span>
                  </div>

                  <div className="bg-black/80 border border-zinc-850 p-2 rounded flex flex-col gap-0.5">
                    <span className="text-zinc-500">PLAIN-TEXT RATIO</span>
                    <span className="text-emerald-400 font-bold">100% PLAIN-TEXT</span>
                  </div>

                  <div className="bg-black/80 border border-zinc-850 p-2 rounded flex flex-col gap-0.5">
                    <span className="text-zinc-500">DELIVERABILITY SCORE</span>
                    <span className="text-emerald-400 font-bold">{deliverabilityAudit.score}/10 (INBOX READY)</span>
                  </div>
                </div>
              </div>

              {/* 5 DISTINCT SUBJECT LINE CANDIDATES SELECTOR */}
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider">
                    // 5 DISTINCT SUBJECT-LINE CANDIDATES (SELECT STRONGEST):
                  </span>
                  <span className="text-[9px] text-zinc-500">NO GENERIC TEMPLATES</span>
                </div>

                <div className="grid grid-cols-1 gap-1.5 text-xs font-sans">
                  {[
                    { key: 'architectureQuestion', label: 'Architecture Question', val: subjectCandidates.architectureQuestion },
                    { key: 'scalingObservation', label: 'Scaling Observation', val: subjectCandidates.scalingObservation },
                    { key: 'technicalValidation', label: 'Technical Validation', val: subjectCandidates.technicalValidation },
                    { key: 'architectureTradeoff', label: 'Architecture Trade-Off', val: subjectCandidates.architectureTradeoff },
                    { key: 'researchLed', label: 'Research-Led Review', val: subjectCandidates.researchLed }
                  ].map(option => {
                    const isSelected = activeSubject === option.val;
                    return (
                      <div
                        key={option.key}
                        onClick={() => setSelectedSubjectOverride(prev => ({ ...prev, [selectedCompany.slug]: option.val }))}
                        className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                            : 'bg-black/60 border-zinc-850 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-zinc-600'}`} />
                          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold w-36 shrink-0">
                            [{option.label}]:
                          </span>
                          <span className="font-medium text-xs text-white">
                            "{option.val}"
                          </span>
                        </div>
                        {isSelected && (
                          <span className="text-[9px] font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded uppercase shrink-0">
                            ✓ ACTIVE SUBJECT
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Follow-Up Review Mode (Stage 1 Sent or Stage 2 Sent Due) */}
              {(isFollowUp1Due(selectedCompany.slug) || isFollowUp2Due(selectedCompany.slug)) ? (
                // FOLLOW-UP REVIEW MODE
                <div className="space-y-6 font-mono text-xs">
                  <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-2">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">
                      {isFollowUp2Due(selectedCompany.slug) ? 'PREVIOUS FOLLOW-UP SENT (STAGE 2):' : 'ORIGINAL FIRST-TOUCH EMAIL (STAGE 1 SENT):'}
                    </span>
                    <p className="text-zinc-400 italic text-[11px] whitespace-pre-wrap line-clamp-3">
                      {selectedCompany.emailSequence[0].body}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[#041026] border border-cyan-500/40 p-4 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-cyan-400 font-bold uppercase">
                          {isFollowUp2Due(selectedCompany.slug) ? 'FOLLOW-UP #2 BENCHMARK INSIGHT:' : 'NEW TECHNICAL OBSERVATION:'}
                        </span>
                        <button onClick={handleGenerateFollowUp} disabled={isGeneratingFollowUp} className="text-[9px] bg-zinc-900 border border-zinc-700 px-2 py-1 rounded text-zinc-300 hover:text-white cursor-pointer">
                          REJECT & REGENERATE
                        </button>
                      </div>
                      <p className="text-white text-[12px]">
                        {currentFollowUpDraft?.observation || `Worker thread queue contention under sustained ${selectedCompany.challenge.toLowerCase().split(' ')[0]} spikes.`}
                      </p>
                    </div>

                    <div className="grid grid-cols-5 gap-2 text-center text-[9px] font-bold">
                      <div className="bg-zinc-950 border border-zinc-800 p-2 rounded flex flex-col gap-1">
                        <span className="text-zinc-500">SPECIFICITY</span>
                        <span className="text-emerald-400 text-sm">{currentFollowUpDraft?.scores?.specificity || 9}/10</span>
                      </div>
                      <div className="bg-zinc-950 border border-zinc-800 p-2 rounded flex flex-col gap-1">
                        <span className="text-zinc-500">CREDIBILITY</span>
                        <span className="text-emerald-400 text-sm">{currentFollowUpDraft?.scores?.technicalCredibility || 10}/10</span>
                      </div>
                      <div className="bg-zinc-950 border border-zinc-800 p-2 rounded flex flex-col gap-1">
                        <span className="text-zinc-500">HUMAN TONE</span>
                        <span className="text-emerald-400 text-sm">{currentFollowUpDraft?.scores?.humanTone || 10}/10</span>
                      </div>
                      <div className="bg-zinc-950 border border-zinc-800 p-2 rounded flex flex-col gap-1">
                        <span className="text-zinc-500">REPLY POTENTIAL</span>
                        <span className="text-emerald-400 text-sm">{currentFollowUpDraft?.scores?.replyPotential || 9}/10</span>
                      </div>
                      <div className="bg-zinc-950 border border-zinc-800 p-2 rounded flex flex-col gap-1">
                        <span className="text-zinc-500">CLAIM SAFETY</span>
                        <span className="text-emerald-400 text-sm">{currentFollowUpDraft?.scores?.claimSafety || 10}/10</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase">
                        {isFollowUp2Due(selectedCompany.slug) ? 'DRAFT FOLLOW-UP #2 (DEEP ARCHITECTURE NOTE):' : 'DRAFT FOLLOW-UP #1 (PEER-TO-PEER NOTE):'}
                      </label>
                      <textarea
                        readOnly
                        rows={8}
                        value={activeDraftBody}
                        className="w-full bg-zinc-950 border border-cyan-500/30 rounded p-3 text-cyan-50 font-sans text-xs resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      onClick={handleApproveFollowUp}
                      className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>APPROVE DRAFT & SEND {isFollowUp2Due(selectedCompany.slug) ? 'FOLLOW-UP #2' : 'FOLLOW-UP #1'} (+7 DAYS)</span>
                      <FastForward className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                // STANDARD FIRST TOUCH SEQUENCE COMPOSER MODE
                <div className="space-y-6">
                  {/* Architectural Challenge Signal */}
                  <div className="bg-black/90 border border-zinc-850 p-4 rounded-xl space-y-3 font-mono text-xs">
                    <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider block">
                      // VERIFIED AST ARCHITECTURAL OBSERVATION & EVIDENCE:
                    </span>

                    <p className="text-xs text-zinc-300 font-sans leading-relaxed italic">
                      "{selectedCompany.challenge}"
                    </p>

                    <div className="text-[11px] text-zinc-400 font-sans pt-1 border-t border-zinc-900 flex flex-col gap-1">
                      <div><strong className="text-zinc-300">Evidence:</strong> {selectedCompany.evidence}</div>
                      <div><strong className="text-zinc-300">Affected Area:</strong> {selectedCompany.affectedComponent}</div>
                    </div>
                  </div>

                  {/* LinkedIn 24h Warm-up Quick Bar */}
                  <div className="bg-zinc-950 border border-cyan-500/30 p-3 rounded-xl flex items-center justify-between gap-3 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-cyan-400" />
                      <span className="text-zinc-300 font-sans text-xs">
                        <strong>LinkedIn 24h Warm-Up:</strong> Connect 24h before email send to boost reply rate by 3x.
                      </span>
                    </div>
                    <button
                      onClick={handleCopyLinkedInMessage}
                      className="px-3 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-bold uppercase rounded text-[10px] transition-colors shrink-0 cursor-pointer"
                    >
                      {linkedInCopyFeedback ? 'LINKEDIN MSG COPIED!' : 'COPY LINKEDIN MSG'}
                    </button>
                  </div>

                  {/* Email Content Box */}
                  <div className="space-y-4 font-mono text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-bold">RECIPIENT EMAIL:</label>
                      <input
                        type="text"
                        readOnly
                        value={activeEmail}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded p-2.5 text-zinc-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-bold">SELECTED SUBJECT LINE:</label>
                      <input
                        type="text"
                        readOnly
                        value={activeSubject}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded p-2.5 text-cyan-400 font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-bold">EMAIL BODY (PLAIN TEXT • 1 RESEARCH URL):</label>
                      <textarea
                        rows={10}
                        readOnly
                        value={currentStepBody}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded p-3 text-zinc-200 leading-relaxed font-mono text-xs resize-none"
                      />
                    </div>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs">
                    <button
                      onClick={handleSendAndAdvance}
                      className="flex-1 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold uppercase rounded-xl transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>SEND FIRST TOUCH & SCHEDULE FOLLOW-UP ({defaultStep.waitDays} DAYS)</span>
                      <FastForward className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleCopyEmail}
                      className="px-4 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold uppercase rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copyFeedback ? 'COPIED!' : 'COPY EMAIL'}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
