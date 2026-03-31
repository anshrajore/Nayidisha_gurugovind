import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock4, MapPin, Rocket, Users, Target, Building2, Laptop, Star } from 'lucide-react';

type Internship = {
  id: string;
  title: string;
  company: string;
  location: string;
  mode: 'Onsite' | 'Remote' | 'Hybrid';
  duration: string;
  stipend: string;
  applyBy: string;
  summary: string;
  responsibilities: string[];
  perks: string[];
};

const internshipListings: Internship[] = [
  {
    id: 'pm-1',
    title: 'Associate Product Manager Intern',
    company: 'NayiPay Fintech',
    location: 'Bengaluru, India',
    mode: 'Hybrid',
    duration: '6 months',
    stipend: '₹35,000 / month',
    applyBy: '15 Dec 2025',
    summary: 'Work with senior PMs to build financial wellness tools for blue-collar workers.',
    responsibilities: [
      'Own discovery sprints with user research & insight synthesis',
      'Define PRDs, success metrics, and experiment roadmaps',
      'Collaborate with design & engineering to ship weekly increments'
    ],
    perks: [
      'Hybrid work model',
      'Dedicated PM mentor',
      'Pre-placement offer on performance'
    ]
  },
  {
    id: 'pm-2',
    title: 'Growth Product Intern',
    company: 'SkillBridge',
    location: 'Remote-first',
    mode: 'Remote',
    duration: '4 months',
    stipend: '₹30,000 / month + incentives',
    applyBy: '5 Jan 2026',
    summary: 'Drive adoption experiments for skilling cohorts and apprenticeship products.',
    responsibilities: [
      'Analyze funnel data to identify breakpoints',
      'Design & run no-code experiments to validate hypotheses',
      'Report experiment learnings with actionable playbooks'
    ],
    perks: [
      'Remote stipend for workspace setup',
      'Credits for PM tooling stack',
      'Executive AMA series'
    ]
  },
  {
    id: 'pm-3',
    title: 'Platform Product Intern',
    company: 'NayiDisha Labs',
    location: 'Gurugram, India',
    mode: 'Onsite',
    duration: '5 months',
    stipend: '₹32,500 / month',
    applyBy: '28 Nov 2025',
    summary: 'Shape the employer-side talent platform powering NayiDisha’s job marketplace.',
    responsibilities: [
      'Map employer workflows & find automation opportunities',
      'Prioritize backlog with data-driven scoring models',
      'Measure rollout success with Supabase + Mixpanel dashboards'
    ],
    perks: [
      'Access to leadership roundtables',
      'Travel allowance for field visits',
      'PM certification sponsorship'
    ]
  }
];

const highlights = [
  {
    title: 'Structured Mentorship',
    icon: Users,
    description: 'Weekly 1:1s with senior PMs, peer circles, and office hours for unblockers.'
  },
  {
    title: 'Real Shipping Ownership',
    icon: Rocket,
    description: 'End-to-end pods where you drive discovery, delivery, and post-launch metrics.'
  },
  {
    title: 'Career Accelerator',
    icon: Target,
    description: 'PM resume workshops, mock interviews, and hiring partner demos.'
  }
];

const PMInternships = () => {
  return (
    <Layout>
      <div className="container py-12 space-y-10">
        <section className="text-center space-y-4">
          <Badge variant="outline" className="text-sm px-4 py-1.5">
            Product Management Internship Program
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Build Career-Defining PM Experience
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Curated internships focused on impact, ownership, and mentorship for high-agency students & early professionals.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge className="px-4 py-1.5" variant="secondary">
              <Clock4 className="w-4 h-4 mr-2" /> Batch 02 • Jan 2026
            </Badge>
            <Badge className="px-4 py-1.5" variant="secondary">
              <Star className="w-4 h-4 mr-2" /> 120+ PM Alumni
            </Badge>
            <Badge className="px-4 py-1.5" variant="secondary">
              <Laptop className="w-4 h-4 mr-2" /> Remote & Hybrid roles
            </Badge>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="btn-primary">
              Apply to Program
            </Button>
            <Button size="lg" variant="outline">
              Download Program Deck
            </Button>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title} className="border-primary/10 shadow-sm">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <item.icon className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">Open Internship Roles</h2>
              <p className="text-muted-foreground">
                Handpicked projects with real product ownership. Rolling updates every fortnight.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="px-4 py-1.5 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Apply now for Jan 2026 intake
              </Badge>
            </div>
          </div>

          <div className="space-y-5">
            {internshipListings.map((role) => (
              <Card key={role.id} className="border border-primary/10 shadow-md">
                <CardHeader className="space-y-1">
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <CardTitle className="text-2xl">{role.title}</CardTitle>
                    <Badge>{role.mode}</Badge>
                  </div>
                  <CardDescription className="text-base">
                    {role.company} • {role.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{role.summary}</p>
                  <div className="grid gap-4 md:grid-cols-3">
                    <InfoChip icon={Building2} label="Company" value={role.company} />
                    <InfoChip icon={MapPin} label="Location" value={role.location} />
                    <InfoChip icon={Clock4} label="Duration" value={role.duration} />
                    <InfoChip icon={Laptop} label="Mode" value={role.mode} />
                    <InfoChip icon={Calendar} label="Apply by" value={role.applyBy} />
                    <InfoChip icon={Target} label="Stipend" value={role.stipend} />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                        Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {role.responsibilities.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                        Perks
                      </h4>
                      <ul className="space-y-2">
                        {role.perks.map((perk) => (
                          <li key={perk} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button className="btn-primary">Apply for this role</Button>
                    <Button variant="outline">Save for later</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-muted/60 rounded-3xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold">How the PM Internship Program Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From application to offer, here’s your journey over 16 weeks of hands-on product building.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { title: '01. Application', description: 'Submit resume + a 2-slide product teardown.' },
              { title: '02. Sprint Challenge', description: '24 hour async assignment graded by PM mentors.' },
              { title: '03. Pod Matching', description: 'Meet hiring teams to align on role fit & goals.' },
              { title: '04. Build & Ship', description: 'Ship live user-facing features & demo outcomes.' }
            ].map((step) => (
              <Card key={step.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

const InfoChip = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/70">
    <div className="p-2 rounded-full bg-background border">
      <Icon className="w-4 h-4 text-primary" />
    </div>
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default PMInternships;


