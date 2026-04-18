import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  LogOut, 
  Download, 
  Search, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  Trash2,
  Eye,
  Filter,
  MousePointerClick,
  TrendingUp,
  Users,
  Calendar,
  ClipboardList,
  BookOpen,
} from 'lucide-react';
import { format, subDays, startOfDay, endOfDay, eachDayOfInterval, isSameDay } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

interface Submission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role_type: string | null;
  years_in_practice: string | null;
  brand_maturity: string | null;
  visibility: string | null;
  alignment: string | null;
  friction: string | null;
  commitment: string | null;
  career_horizon: string | null;
  readiness: string | null;
  real_cost: string[] | null;
  real_cost_other: string | null;
  important_areas: string[] | null;
  is_partial: boolean;
  last_completed_step: number;
  created_at: string;
  updated_at: string;
}

interface CTAClick {
  id: string;
  created_at: string;
  event_type: string;
  cta_id: string;
  cta_text: string | null;
  section: string | null;
  page_url: string | null;
  session_id: string | null;
  viewport_width: number | null;
}

interface CTAStats {
  cta_id: string;
  cta_text: string | null;
  section: string | null;
  total_clicks: number;
  unique_sessions: number;
}

interface QuizSubmission {
  id: string;
  first_name: string | null;
  email: string | null;
  score: number;
  score_label: string;
  answers: Record<string, string>;
  session_id: string | null;
  viewport_width: number | null;
  created_at: string;
}

interface WorkbookSubmission {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  practice_name: string | null;
  answers: Record<string, string>;
  source: string | null;
  page_url: string | null;
  user_agent: string | null;
  created_at: string;
}

const ITEMS_PER_PAGE = 10;

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('submissions');
  
  // Quiz state
  const [quizSubmissions, setQuizSubmissions] = useState<QuizSubmission[]>([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizPage, setQuizPage] = useState(1);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizSubmission | null>(null);

  // Workbook state
  const [workbookSubmissions, setWorkbookSubmissions] = useState<WorkbookSubmission[]>([]);
  const [workbookLoading, setWorkbookLoading] = useState(false);
  const [workbookPage, setWorkbookPage] = useState(1);
  const [workbookSearch, setWorkbookSearch] = useState('');
  const [selectedWorkbook, setSelectedWorkbook] = useState<WorkbookSubmission | null>(null);

  // CTA Analytics state
  const [ctaClicks, setCTAClicks] = useState<CTAClick[]>([]);
  const [ctaLoading, setCTALoading] = useState(false);
  const [ctaDateRange, setCTADateRange] = useState('7');

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchSubmissions();
      fetchCTAAnalytics();
      fetchQuizSubmissions();
      fetchWorkbookSubmissions();
    }
  }, [user, isAdmin]);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, searchQuery, statusFilter, roleFilter]);

  useEffect(() => {
    if (user && isAdmin && activeTab === 'analytics') {
      fetchCTAAnalytics();
    }
  }, [ctaDateRange, activeTab]);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('eligibility_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch submissions.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCTAAnalytics = async () => {
    setCTALoading(true);
    try {
      const startDate = subDays(new Date(), parseInt(ctaDateRange));
      const { data, error } = await supabase
        .from('cta_analytics')
        .select('*')
        .gte('created_at', startOfDay(startDate).toISOString())
        .lte('created_at', endOfDay(new Date()).toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCTAClicks(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch CTA analytics.',
        variant: 'destructive',
      });
    } finally {
      setCTALoading(false);
    }
  };

  const fetchQuizSubmissions = async () => {
    setQuizLoading(true);
    try {
      const { data, error } = await supabase
        .from('quiz_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuizSubmissions((data as unknown as QuizSubmission[]) || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch quiz submissions.',
        variant: 'destructive',
      });
    } finally {
      setQuizLoading(false);
    }
  };

  const fetchWorkbookSubmissions = async () => {
    setWorkbookLoading(true);
    try {
      const { data, error } = await supabase
        .from('brand_workbook_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorkbookSubmissions((data as unknown as WorkbookSubmission[]) || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch workbook submissions.',
        variant: 'destructive',
      });
    } finally {
      setWorkbookLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.first_name.toLowerCase().includes(query) ||
          s.last_name.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query) ||
          (s.phone && s.phone.includes(query))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'complete') {
        filtered = filtered.filter((s) => !s.is_partial);
      } else if (statusFilter === 'partial') {
        filtered = filtered.filter((s) => s.is_partial);
      }
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter((s) => s.role_type === roleFilter);
    }

    setFilteredSubmissions(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('eligibility_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      toast({
        title: 'Deleted',
        description: 'Submission has been deleted.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete submission.',
        variant: 'destructive',
      });
    }
    setDeleteId(null);
  };

  const exportToCSV = () => {
    const headers = [
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Role Type',
      'Years in Practice',
      'Brand Maturity',
      'Visibility',
      'Alignment',
      'Friction',
      'Commitment',
      'Career Horizon',
      'Readiness',
      'Real Cost',
      'Important Areas',
      'Status',
      'Last Step',
      'Created At',
    ];

    const csvData = filteredSubmissions.map((s) => [
      s.first_name,
      s.last_name,
      s.email,
      s.phone || '',
      s.role_type || '',
      s.years_in_practice || '',
      s.brand_maturity || '',
      s.visibility || '',
      s.alignment || '',
      s.friction || '',
      s.commitment || '',
      s.career_horizon || '',
      s.readiness || '',
      s.real_cost?.join('; ') || '',
      s.important_areas?.join('; ') || '',
      s.is_partial ? 'Partial' : 'Complete',
      s.last_completed_step.toString(),
      format(new Date(s.created_at), 'yyyy-MM-dd HH:mm:ss'),
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `submissions_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();

    toast({
      title: 'Exported',
      description: `${filteredSubmissions.length} submissions exported to CSV.`,
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  // Pagination
  const totalPages = Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE);
  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Get unique roles for filter
  const uniqueRoles = [...new Set(submissions.map((s) => s.role_type).filter(Boolean))];

  // CTA Analytics calculations
  const ctaStats = useMemo((): CTAStats[] => {
    const statsMap = new Map<string, CTAStats>();
    
    ctaClicks.forEach((click) => {
      const key = click.cta_id;
      if (!statsMap.has(key)) {
        statsMap.set(key, {
          cta_id: click.cta_id,
          cta_text: click.cta_text,
          section: click.section,
          total_clicks: 0,
          unique_sessions: 0,
        });
      }
      const stat = statsMap.get(key)!;
      stat.total_clicks++;
    });

    // Calculate unique sessions per CTA
    statsMap.forEach((stat, key) => {
      const sessions = new Set(
        ctaClicks.filter((c) => c.cta_id === key).map((c) => c.session_id)
      );
      stat.unique_sessions = sessions.size;
    });

    return Array.from(statsMap.values()).sort((a, b) => b.total_clicks - a.total_clicks);
  }, [ctaClicks]);

  const totalCTAClicks = ctaClicks.length;
  const uniqueCTASessions = new Set(ctaClicks.map((c) => c.session_id)).size;
  const bookingClicks = ctaClicks.filter((c) => c.cta_id === 'calendly-booking').length;
  const conversionRate = uniqueCTASessions > 0 ? ((bookingClicks / uniqueCTASessions) * 100).toFixed(1) : '0';

  // Quiz computed values
  const quizTotalPages = Math.ceil(quizSubmissions.length / ITEMS_PER_PAGE);
  const paginatedQuiz = quizSubmissions.slice(
    (quizPage - 1) * ITEMS_PER_PAGE,
    quizPage * ITEMS_PER_PAGE
  );
  const quizTierCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    quizSubmissions.forEach((q) => {
      counts[q.score_label] = (counts[q.score_label] || 0) + 1;
    });
    return counts;
  }, [quizSubmissions]);
  const avgQuizScore = quizSubmissions.length > 0
    ? (quizSubmissions.reduce((sum, q) => sum + q.score, 0) / quizSubmissions.length).toFixed(1)
    : '0';

  const exportQuizCSV = () => {
    const headers = ['First Name', 'Email', 'Score', 'Tier', 'Revenue Source', 'Brand Perception', 'Content System', 'Growth Ceiling', 'Date'];
    const csvData = quizSubmissions.map((q) => [
      q.first_name || '',
      q.email || '',
      q.score.toString(),
      q.score_label,
      q.answers?.revenue_source || '',
      q.answers?.brand_perception || '',
      q.answers?.content_system || '',
      q.answers?.growth_ceiling || '',
      format(new Date(q.created_at), 'yyyy-MM-dd HH:mm:ss'),
    ]);
    const csvContent = [
      headers.join(','),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `quiz_submissions_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    toast({ title: 'Exported', description: `${quizSubmissions.length} quiz submissions exported.` });
  };

  // Chart data - clicks over time
  const clicksOverTimeData = useMemo(() => {
    const days = parseInt(ctaDateRange);
    const startDate = subDays(new Date(), days);
    const dateRange = eachDayOfInterval({ start: startDate, end: new Date() });
    
    return dateRange.map((date) => {
      const dayClicks = ctaClicks.filter((click) => 
        isSameDay(new Date(click.created_at), date)
      );
      const bookings = dayClicks.filter((c) => c.cta_id === 'calendly-booking').length;
      const ctaButtonClicks = dayClicks.filter((c) => c.cta_id !== 'calendly-booking').length;
      
      return {
        date: format(date, 'MMM d'),
        fullDate: format(date, 'MMM d, yyyy'),
        clicks: dayClicks.length,
        bookings,
        ctaClicks: ctaButtonClicks,
      };
    });
  }, [ctaClicks, ctaDateRange]);

  // Chart data - clicks by CTA
  const clicksByCTAData = useMemo(() => {
    return ctaStats.slice(0, 6).map((stat) => ({
      name: stat.cta_text || stat.cta_id,
      clicks: stat.total_clicks,
      sessions: stat.unique_sessions,
    }));
  }, [ctaStats]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage eligibility submissions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">
              {user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="submissions" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Submissions
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="workbook" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Workbook
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <MousePointerClick className="w-4 h-4" />
              CTA Analytics
            </TabsTrigger>
          </TabsList>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Total Submissions</p>
                <p className="text-2xl font-bold text-foreground">{submissions.length}</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Complete</p>
                <p className="text-2xl font-bold text-green-500">
                  {submissions.filter((s) => !s.is_partial).length}
                </p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Partial</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {submissions.filter((s) => s.is_partial).length}
                </p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold text-primary">
                  {submissions.filter((s) => 
                    new Date(s.created_at).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
            </div>

            {/* Filters and Actions */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {uniqueRoles.map((role) => (
                      <SelectItem key={role} value={role!}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={fetchSubmissions} disabled={isLoading}>
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
                <Button onClick={exportToCSV} disabled={filteredSubmissions.length === 0}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="flex items-center justify-center">
                            <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                            Loading...
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : paginatedSubmissions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No submissions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">
                            {submission.first_name} {submission.last_name}
                          </TableCell>
                          <TableCell>{submission.email}</TableCell>
                          <TableCell>
                            {submission.role_type || (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={submission.is_partial ? 'secondary' : 'default'}>
                              {submission.is_partial ? 'Partial' : 'Complete'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary"
                                  style={{
                                    width: `${(submission.last_completed_step / 12) * 100}%`,
                                  }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {submission.last_completed_step}/12
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(submission.created_at), 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedSubmission(submission)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDeleteId(submission.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredSubmissions.length)} of{' '}
                    {filteredSubmissions.length} results
                  </p>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Quiz Submissions Tab */}
          <TabsContent value="quiz" className="space-y-6">
            {/* Quiz Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Total Quiz Leads</p>
                <p className="text-2xl font-bold text-foreground">{quizSubmissions.length}</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="text-2xl font-bold text-primary">{avgQuizScore} / 16</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Top Tier</p>
                <p className="text-2xl font-bold text-foreground">
                  {Object.entries(quizTierCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'}
                </p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold text-foreground">
                  {quizSubmissions.filter((q) => new Date(q.created_at).toDateString() === new Date().toDateString()).length}
                </p>
              </div>
            </div>

            {/* Tier Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Foundation Stage', 'Growth Stage', 'Acceleration Stage', 'Elite Stage'].map((tier) => (
                <div key={tier} className="bg-card rounded-lg border border-border p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{tier}</p>
                  <p className="text-lg font-bold text-foreground">{quizTierCounts[tier] || 0}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={fetchQuizSubmissions} disabled={quizLoading}>
                <RefreshCw className={`w-4 h-4 ${quizLoading ? 'animate-spin' : ''}`} />
              </Button>
              <Button onClick={exportQuizCSV} disabled={quizSubmissions.length === 0}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            {/* Quiz Table */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="flex items-center justify-center">
                            <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                            Loading...
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : paginatedQuiz.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No quiz submissions yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedQuiz.map((quiz) => (
                        <TableRow key={quiz.id}>
                          <TableCell className="font-medium">{quiz.first_name || '—'}</TableCell>
                          <TableCell>{quiz.email || '—'}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${(quiz.score / 16) * 100}%` }} />
                              </div>
                              <span className="text-sm font-medium">{quiz.score}/16</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              quiz.score_label === 'Elite Stage' ? 'default' :
                              quiz.score_label === 'Acceleration Stage' ? 'default' :
                              quiz.score_label === 'Growth Stage' ? 'secondary' : 'outline'
                            }>
                              {quiz.score_label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(quiz.created_at), 'MMM d, yyyy h:mm a')}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedQuiz(quiz)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {quizTotalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Showing {(quizPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                    {Math.min(quizPage * ITEMS_PER_PAGE, quizSubmissions.length)} of{' '}
                    {quizSubmissions.length} results
                  </p>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" onClick={() => setQuizPage((p) => Math.max(1, p - 1))} disabled={quizPage === 1}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setQuizPage((p) => Math.min(quizTotalPages, p + 1))} disabled={quizPage === quizTotalPages}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Workbook Submissions Tab */}
          <TabsContent value="workbook" className="space-y-6">
            {/* Workbook Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Total Workbook Leads</p>
                <p className="text-2xl font-bold text-foreground">{workbookSubmissions.length}</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold text-primary">
                  {workbookSubmissions.filter((w) => new Date(w.created_at).toDateString() === new Date().toDateString()).length}
                </p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Last 7 Days</p>
                <p className="text-2xl font-bold text-foreground">
                  {workbookSubmissions.filter((w) => new Date(w.created_at) >= subDays(new Date(), 7)).length}
                </p>
              </div>
            </div>

            {/* Workbook Filters / Actions */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or practice..."
                  value={workbookSearch}
                  onChange={(e) => { setWorkbookSearch(e.target.value); setWorkbookPage(1); }}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={fetchWorkbookSubmissions} disabled={workbookLoading}>
                  <RefreshCw className={`w-4 h-4 ${workbookLoading ? 'animate-spin' : ''}`} />
                </Button>
                <Button
                  onClick={() => {
                    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Practice', 'Source', 'Date', 'Answers (JSON)'];
                    const rows = workbookSubmissions.map((w) => [
                      w.first_name || '',
                      w.last_name || '',
                      w.email || '',
                      w.phone || '',
                      w.practice_name || '',
                      w.source || '',
                      format(new Date(w.created_at), 'yyyy-MM-dd HH:mm:ss'),
                      JSON.stringify(w.answers || {}),
                    ]);
                    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n');
                    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `workbook_submissions_${format(new Date(), 'yyyy-MM-dd')}.csv`;
                    link.click();
                    toast({ title: 'Exported', description: `${workbookSubmissions.length} workbook submissions exported.` });
                  }}
                  disabled={workbookSubmissions.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Workbook Table */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Practice</TableHead>
                      <TableHead>Answers</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(() => {
                      const q = workbookSearch.toLowerCase();
                      const filtered = workbookSubmissions.filter((w) =>
                        !q ||
                        w.first_name?.toLowerCase().includes(q) ||
                        (w.last_name || '').toLowerCase().includes(q) ||
                        w.email?.toLowerCase().includes(q) ||
                        (w.practice_name || '').toLowerCase().includes(q)
                      );
                      const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
                      const paginated = filtered.slice((workbookPage - 1) * ITEMS_PER_PAGE, workbookPage * ITEMS_PER_PAGE);

                      if (workbookLoading) {
                        return (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                              <div className="flex items-center justify-center">
                                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                                Loading...
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      }
                      if (paginated.length === 0) {
                        return (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                              No workbook submissions yet
                            </TableCell>
                          </TableRow>
                        );
                      }
                      return paginated.map((w) => {
                        const answersCount = Object.values(w.answers || {}).filter((v) => v && String(v).trim()).length;
                        return (
                          <TableRow key={w.id}>
                            <TableCell className="font-medium">
                              {w.first_name} {w.last_name || ''}
                            </TableCell>
                            <TableCell>{w.email}</TableCell>
                            <TableCell>{w.practice_name || <span className="text-muted-foreground">—</span>}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{answersCount} filled</Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {format(new Date(w.created_at), 'MMM d, yyyy h:mm a')}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => setSelectedWorkbook(w)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      });
                    })()}
                  </TableBody>
                </Table>
              </div>

              {(() => {
                const q = workbookSearch.toLowerCase();
                const filtered = workbookSubmissions.filter((w) =>
                  !q ||
                  w.first_name?.toLowerCase().includes(q) ||
                  (w.last_name || '').toLowerCase().includes(q) ||
                  w.email?.toLowerCase().includes(q) ||
                  (w.practice_name || '').toLowerCase().includes(q)
                );
                const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
                if (totalPages <= 1) return null;
                return (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Showing {(workbookPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                      {Math.min(workbookPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} results
                    </p>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => setWorkbookPage((p) => Math.max(1, p - 1))} disabled={workbookPage === 1}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setWorkbookPage((p) => Math.min(totalPages, p + 1))} disabled={workbookPage === totalPages}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </TabsContent>

          {/* CTA Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-1">
                  <MousePointerClick className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Total Clicks</p>
                </div>
                <p className="text-2xl font-bold text-foreground">{totalCTAClicks}</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Unique Sessions</p>
                </div>
                <p className="text-2xl font-bold text-blue-500">{uniqueCTASessions}</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Bookings</p>
                </div>
                <p className="text-2xl font-bold text-green-500">{bookingClicks}</p>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                </div>
                <p className="text-2xl font-bold text-primary">{conversionRate}%</p>
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="flex items-center gap-4">
              <Select value={ctaDateRange} onValueChange={setCTADateRange}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Last 24 hours</SelectItem>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={fetchCTAAnalytics} disabled={ctaLoading}>
                <RefreshCw className={`w-4 h-4 ${ctaLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Clicks Over Time Chart */}
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="mb-4">
                  <h3 className="font-medium text-foreground">Clicks Over Time</h3>
                  <p className="text-sm text-muted-foreground">Daily CTA clicks and bookings</p>
                </div>
                <div className="h-[280px]">
                  {ctaLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : clicksOverTimeData.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      No data available
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={clicksOverTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="date" 
                          stroke="hsl(var(--muted-foreground))" 
                          fontSize={12}
                          tickLine={false}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))" 
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            color: 'hsl(var(--foreground))'
                          }}
                          labelFormatter={(label, payload) => payload?.[0]?.payload?.fullDate || label}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="ctaClicks" 
                          name="CTA Clicks"
                          stroke="hsl(var(--primary))" 
                          fillOpacity={1} 
                          fill="url(#colorClicks)" 
                          strokeWidth={2}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="bookings" 
                          name="Bookings"
                          stroke="#22c55e" 
                          fillOpacity={1} 
                          fill="url(#colorBookings)" 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Clicks by CTA Chart */}
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="mb-4">
                  <h3 className="font-medium text-foreground">Top Performing CTAs</h3>
                  <p className="text-sm text-muted-foreground">Clicks by button type</p>
                </div>
                <div className="h-[280px]">
                  {ctaLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : clicksByCTAData.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      No data available
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={clicksByCTAData} layout="vertical" margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
                        <XAxis 
                          type="number" 
                          stroke="hsl(var(--muted-foreground))" 
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          stroke="hsl(var(--muted-foreground))" 
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          width={100}
                          tickFormatter={(value) => value.length > 14 ? value.slice(0, 14) + '...' : value}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            color: 'hsl(var(--foreground))'
                          }}
                        />
                        <Legend />
                        <Bar 
                          dataKey="clicks" 
                          name="Total Clicks"
                          fill="hsl(var(--primary))" 
                          radius={[0, 4, 4, 0]}
                        />
                        <Bar 
                          dataKey="sessions" 
                          name="Unique Sessions"
                          fill="hsl(var(--primary) / 0.4)" 
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>

            {/* CTA Performance Table */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="font-medium text-foreground">CTA Performance by Button</h3>
                <p className="text-sm text-muted-foreground">Click metrics for each call-to-action</p>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>CTA Button</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead className="text-right">Total Clicks</TableHead>
                      <TableHead className="text-right">Unique Sessions</TableHead>
                      <TableHead className="text-right">Click Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ctaLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <div className="flex items-center justify-center">
                            <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                            Loading...
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : ctaStats.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No CTA clicks recorded in this period
                        </TableCell>
                      </TableRow>
                    ) : (
                      ctaStats.map((stat) => (
                        <TableRow key={stat.cta_id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{stat.cta_text || stat.cta_id}</p>
                              <p className="text-xs text-muted-foreground">{stat.cta_id}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{stat.section || 'unknown'}</Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {stat.total_clicks}
                          </TableCell>
                          <TableCell className="text-right">
                            {stat.unique_sessions}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary"
                                  style={{
                                    width: `${Math.min((stat.total_clicks / Math.max(totalCTAClicks, 1)) * 100, 100)}%`,
                                  }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground w-10 text-right">
                                {((stat.total_clicks / Math.max(totalCTAClicks, 1)) * 100).toFixed(0)}%
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Recent Clicks */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="font-medium text-foreground">Recent Clicks</h3>
                <p className="text-sm text-muted-foreground">Last 20 CTA interactions</p>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Button</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Page</TableHead>
                      <TableHead>Device</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ctaClicks.slice(0, 20).map((click) => (
                      <TableRow key={click.id}>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(click.created_at), 'MMM d, h:mm a')}
                        </TableCell>
                        <TableCell className="font-medium">
                          {click.cta_text || click.cta_id}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{click.section || 'unknown'}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {click.page_url || '/'}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {click.viewport_width ? (
                            click.viewport_width < 768 ? 'Mobile' : click.viewport_width < 1024 ? 'Tablet' : 'Desktop'
                          ) : '—'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* View Submission Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Submission Details
            </DialogTitle>
            <DialogDescription>
              {selectedSubmission && (
                <>
                  {selectedSubmission.first_name} {selectedSubmission.last_name} •{' '}
                  {format(new Date(selectedSubmission.created_at), 'MMMM d, yyyy h:mm a')}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <DetailField label="First Name" value={selectedSubmission.first_name} />
                <DetailField label="Last Name" value={selectedSubmission.last_name} />
                <DetailField label="Email" value={selectedSubmission.email} />
                <DetailField label="Phone" value={selectedSubmission.phone} />
                <DetailField label="Role Type" value={selectedSubmission.role_type} />
                <DetailField label="Years in Practice" value={selectedSubmission.years_in_practice} />
                <DetailField label="Brand Maturity" value={selectedSubmission.brand_maturity} />
                <DetailField label="Visibility" value={selectedSubmission.visibility} />
                <DetailField label="Alignment" value={selectedSubmission.alignment} />
                <DetailField label="Friction" value={selectedSubmission.friction} />
                <DetailField label="Commitment" value={selectedSubmission.commitment} />
                <DetailField label="Career Horizon" value={selectedSubmission.career_horizon} />
                <DetailField label="Readiness" value={selectedSubmission.readiness} />
              </div>
              {selectedSubmission.real_cost && selectedSubmission.real_cost.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Real Cost</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedSubmission.real_cost.map((cost) => (
                      <Badge key={cost} variant="secondary">{cost}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {selectedSubmission.important_areas && selectedSubmission.important_areas.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Important Areas</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedSubmission.important_areas.map((area) => (
                      <Badge key={area} variant="secondary">{area}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {selectedSubmission.real_cost_other && (
                <DetailField label="Real Cost (Other)" value={selectedSubmission.real_cost_other} />
              )}
              <div className="pt-4 border-t border-border flex justify-between text-sm text-muted-foreground">
                <span>Progress: Step {selectedSubmission.last_completed_step} of 12</span>
                <Badge variant={selectedSubmission.is_partial ? 'secondary' : 'default'}>
                  {selectedSubmission.is_partial ? 'Partial' : 'Complete'}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Quiz Detail Dialog */}
      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Quiz Submission Details</DialogTitle>
            <DialogDescription>
              {selectedQuiz && (
                <>
                  {selectedQuiz.first_name || 'Anonymous'} • Score: {selectedQuiz.score}/16 •{' '}
                  {format(new Date(selectedQuiz.created_at), 'MMMM d, yyyy h:mm a')}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          {selectedQuiz && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <DetailField label="Name" value={selectedQuiz.first_name} />
                <DetailField label="Email" value={selectedQuiz.email} />
                <DetailField label="Score" value={`${selectedQuiz.score} / 16`} />
                <DetailField label="Tier" value={selectedQuiz.score_label} />
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground mb-3">Answers</p>
                <div className="space-y-2">
                  {Object.entries(selectedQuiz.answers || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-start gap-4">
                      <p className="text-sm text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</p>
                      <Badge variant="secondary">{String(value)}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-4 grid grid-cols-2 gap-4">
                <DetailField label="Device" value={
                  selectedQuiz.viewport_width
                    ? selectedQuiz.viewport_width < 768 ? 'Mobile' : selectedQuiz.viewport_width < 1024 ? 'Tablet' : 'Desktop'
                    : null
                } />
                <DetailField label="Session ID" value={selectedQuiz.session_id?.slice(0, 8) || null} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Workbook Detail Dialog */}
      <Dialog open={!!selectedWorkbook} onOpenChange={() => setSelectedWorkbook(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Brand Workbook Submission</DialogTitle>
            <DialogDescription>
              {selectedWorkbook && (
                <>
                  {selectedWorkbook.first_name} {selectedWorkbook.last_name || ''} •{' '}
                  {format(new Date(selectedWorkbook.created_at), 'MMMM d, yyyy h:mm a')}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          {selectedWorkbook && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <DetailField label="First Name" value={selectedWorkbook.first_name} />
                <DetailField label="Last Name" value={selectedWorkbook.last_name} />
                <DetailField label="Email" value={selectedWorkbook.email} />
                <DetailField label="Phone" value={selectedWorkbook.phone} />
                <DetailField label="Practice" value={selectedWorkbook.practice_name} />
                <DetailField label="Source" value={selectedWorkbook.source} />
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground mb-3">
                  Workbook Answers ({Object.values(selectedWorkbook.answers || {}).filter((v) => v && String(v).trim()).length} filled)
                </p>
                <div className="space-y-3">
                  {Object.entries(selectedWorkbook.answers || {}).length === 0 ? (
                    <p className="text-sm text-muted-foreground">No answers recorded.</p>
                  ) : (
                    Object.entries(selectedWorkbook.answers || {}).map(([key, value]) => (
                      <div key={key} className="border-b border-border/50 pb-2 last:border-0">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                          {key.replace(/_/g, ' ')}
                        </p>
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {value && String(value).trim() ? String(value) : <span className="text-muted-foreground italic">— blank —</span>}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {selectedWorkbook.page_url && (
                <div className="border-t border-border pt-4">
                  <DetailField label="Page URL" value={selectedWorkbook.page_url} />
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Submission?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the submission.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const DetailField = ({ label, value }: { label: string; value: string | null }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-foreground">{value || <span className="text-muted-foreground">—</span>}</p>
  </div>
);

export default AdminDashboard;
