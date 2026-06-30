import type { ReactNode } from "react";

type NavigationItem = {
  label: string;
  hint: string;
};

type AppShellProps = {
  project: string;
  title: string;
  subtitle: string;
  badge: string;
  navigation: NavigationItem[];
  children: ReactNode;
};

export function AppShell({ project, title, subtitle, badge, navigation, children }: AppShellProps) {
  return (
    <div className="shell">
      <aside className="sidebar">
        <span className="brand-tag">Nexum-lite shell</span>
        <h1>{project}</h1>
        <p>{subtitle}</p>

        <ul className="nav-list">
          {navigation.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.hint}</span>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          Frontend seco, fluxo util e base pronta para Supabase.
        </div>
      </aside>

      <main className="content">
        <section className="hero">
          <div className="hero-top">
            <div>
              <p className="eyebrow">{badge}</p>
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </div>

            <span className="hero-badge">Demo data + integracao opcional</span>
          </div>
        </section>

        {children}
      </main>
    </div>
  );
}
