import { 
  XCircle, CheckCircle2, BookOpen, Layers, 
  Users, Rocket, Clock, Map, Target, Briefcase 
} from 'lucide-react';
import { Card } from '@/components/ui/Card';

const traditionalFeatures = [
  { text: 'Scattered Resources', icon: Layers },
  { text: 'Theory Only', icon: BookOpen },
  { text: 'No Mentorship', icon: Users },
  { text: 'No Projects', icon: Target },
  { text: 'Slow Learning', icon: Clock },
];

const semiconFeatures = [
  { text: 'Live Mentorship', icon: Users },
  { text: 'Industry Projects', icon: Target },
  { text: 'AI Assisted Learning', icon: Rocket },
  { text: 'Career Roadmap', icon: Map },
  { text: 'Placement Support', icon: Briefcase },
];

export function InteractiveComparison() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 mb-20 px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
        
        {/* VS badge */}
        <div className="hidden md:flex absolute left-1/2 top-[120px] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center z-20 font-bold text-ink-dim border border-line">
          VS
        </div>

        {/* Traditional */}
        <div className="bg-void-2/60 rounded-[2rem] p-8 sm:p-10 border border-line-strong/30 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex flex-col mb-10 relative z-10">
              <h3 className="text-2xl font-display font-bold text-ink-dim mb-2 opacity-80">The Old Way</h3>
              <p className="text-ink-faint text-[15px] max-w-[280px]">Fragmented, theoretical, and slow. You learn tools, but not how to solve real problems.</p>
            </div>
            
            <div className="space-y-5 relative z-10">
              {traditionalFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-4 text-ink-dim opacity-70">
                  <XCircle className="w-5 h-5 text-ink-faint shrink-0" />
                  <span className="font-medium">{feat.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Semicon Labs */}
        <Card gradient className="p-8 sm:p-10 relative overflow-hidden border border-blue/20 shadow-card flex flex-col justify-between transform md:scale-105 z-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div>
            <div className="flex flex-col mb-10 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                 <h3 className="text-2xl font-display font-bold text-ink">Semicon Labs</h3>
                 <span className="px-2.5 py-1 bg-blue/10 text-blue text-[10px] font-bold uppercase tracking-widest rounded-full">Smarter</span>
              </div>
              <p className="text-ink-dim text-[15px] max-w-[280px]">A unified execution-first platform. Fix real failures and become industry-ready faster.</p>
            </div>
            
            <div className="space-y-5 relative z-10">
              {semiconFeatures.map((feat, i) => (
                <div key={i} className="flex items-center gap-4 text-ink">
                  <div className="w-6 h-6 rounded-full bg-blue/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-blue" />
                  </div>
                  <span className="font-bold">{feat.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
      </div>
    </div>
  );
}
