import { fetchIdeasAction, getDataFromVercelBlog, VercelBlogPostI } from '@/actions';
import {
  AddIdeaForm,
  CalendarWidget,
  Card,
  Header,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import type { Idea } from '@prisma/client';

export default async function Home() {
  const ideas: Idea[] = await fetchIdeasAction();
  const data: VercelBlogPostI[] = await getDataFromVercelBlog();

  return (
    <>
      <Header></Header>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <CalendarWidget data={data} />
        </div>
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">💡 Ideas</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[14rem_1fr]">
          <AddIdeaForm />
          <Card className="p-4">
            <Table>
              <TableCaption>A list of your recent ideas 💡</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>N°</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead className="text-right">Published</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {ideas.length === 0 && (
                  <TableRow>
                    <TableCell className="font-medium">No data</TableCell>
                  </TableRow>
                )}
                {ideas.map((idea, i) => {
                  return (
                    <TableRow key={idea.id}>
                      <TableCell className="font-medium">{i}</TableCell>
                      <TableCell className="font-medium">{idea.title}</TableCell>
                      <TableCell>{idea.content}</TableCell>
                      <TableCell className="text-right">{idea.published ? '✅' : '🚫'}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </>
  );
}
