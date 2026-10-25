import { NavLink } from '@/components/PageTransition';

export default function NotFound() {
  return (
    <section className="page">
      <div className="w">
        <div className="done">
          <h1>Page not found</h1>
          <div className="cta"><NavLink className="btn btn--dark" href="/">Back home</NavLink></div>
        </div>
      </div>
    </section>
  );
}
