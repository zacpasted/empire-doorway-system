import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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
  Filter
} from 'lucide-react';
import { format } from 'date-fns';
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

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchSubmissions();
    }
  }, [user, isAdmin]);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, searchQuery, statusFilter, roleFilter]);

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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
        <div className="flex flex-col md:flex-row gap-4 mb-6">
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
