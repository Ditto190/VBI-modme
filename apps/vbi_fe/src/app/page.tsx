import { redirect } from 'next/navigation'

const HomePage = () => {
  redirect('/manage/reports')
}

export default HomePage
