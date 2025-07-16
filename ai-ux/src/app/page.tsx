import Link from "next/link"
export default function Home() {
   return (
    <nav className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Company A</h1>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Department / Unit</h2>
        <div className="ml-4 space-y-2">
          <div>
            <h3 className="font-medium">Depart A</h3>
            <ul className="ml-4 space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/project-profile-form" className="hover:underline">
                  Projects 
                </Link>
              </li>
              
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Depart B</h3>
            <ul className="ml-4 space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:underline">
                  Projects 
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

