import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type ActivityRow = {
  id: string;
  type: string;
  message: string;
  createdAt: string;
  user: { id: string; firstname: string; lastname: string; email: string } | null;
};

type ActivitySection = {
  category: string;
  items: ActivityRow[];
};

type ContactMessageRow = {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  wantsPartnership: boolean;
  createdAt: string;
};

type NewsletterRow = {
  id: string;
  firstName: string;
  email: string;
  isActive: boolean;
  createdAt: string;
};

type PartnerRequestRow = {
  id: string;
  fullName: string;
  organizationName: string;
  email: string;
  message: string;
  wantsSponsorship: boolean;
  status: string;
  createdAt: string;
};

/** Every /activity/type is UPPER_SNAKE_CASE (COURSE_STARTED, GREEN_AI_CHAT...);
 *  this just makes it readable without needing a label lookup table that
 *  has to be kept in sync with the backend every time a new type is added. */
function humanizeType(type: string) {
  return type
    .toLowerCase()
    .split("_")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

function userLabel(user: ActivityRow["user"]) {
  return user ? `${user.firstname} ${user.lastname}` : "—";
}

// unwrap() handles both the raw array a plain findMany returns and the
// {success, data, message} shape the global ResponseInterceptor wraps
// everything else in — whichever this endpoint happens to send.
function unwrap<T>(data: any): T[] {
  return data?.data ?? data ?? [];
}

function Card({
  title,
  count,
  children,
}: {
  title: string;
  count: number | null;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-gray-300 bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#001F3F]">{title}</h3>
        {count !== null && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
            {count}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export default function AdminOverview() {
  const [sections, setSections] = useState<ActivitySection[] | null>(null);
  const [messages, setMessages] = useState<ContactMessageRow[] | null>(null);
  const [subscriptions, setSubscriptions] = useState<NewsletterRow[] | null>(null);
  const [partnerRequests, setPartnerRequests] = useState<PartnerRequestRow[] | null>(null);

  useEffect(() => {
    api
      .get("/activity/admin/grouped")
      .then(({ data }) => setSections(unwrap<ActivitySection>(data)))
      .catch(() => setSections([]));

    api
      .get("/newsletter/admin/contact-messages?limit=50")
      .then(({ data }) => setMessages(unwrap<ContactMessageRow>(data)))
      .catch(() => setMessages([]));

    api
      .get("/newsletter/admin/subscriptions?limit=50")
      .then(({ data }) => setSubscriptions(unwrap<NewsletterRow>(data)))
      .catch(() => setSubscriptions([]));

    api
      .get("/newsletter/admin/partnership-requests?limit=50")
      .then(({ data }) => setPartnerRequests(unwrap<PartnerRequestRow>(data)))
      .catch(() => setPartnerRequests([]));
  }, []);

  return (
    <div className="space-y-4">
      {/* Platform activity, one card per tool/service */}
      {sections === null ? (
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <p className="text-sm text-gray-500">Loading activity…</p>
        </div>
      ) : sections.length === 0 ? (
        <div className="rounded-md border border-gray-300 bg-white p-4">
          <p className="text-sm text-gray-500">No activity logged yet.</p>
        </div>
      ) : (
        sections.map((section) => (
          <Card key={section.category} title={section.category} count={section.items.length}>
            <table className="mt-3 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="py-2 pr-3">When</th>
                  <th className="py-2 pr-3">User</th>
                  <th className="py-2">Activity</th>
                </tr>
              </thead>
              <tbody>
                {section.items.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100">
                    <td className="py-2 pr-3 whitespace-nowrap text-gray-500">
                      {new Date(row.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 pr-3 whitespace-nowrap">{userLabel(row.user)}</td>
                    <td className="py-2">
                      {row.message}
                      <span className="ml-2 rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] text-gray-500">
                        {humanizeType(row.type)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ))
      )}

      {/* Contact messages — from the public contact form; sender may not be a registered user */}
      <Card title="Contact Messages" count={messages?.length ?? null}>
        {messages === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : messages.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">No contact messages yet.</p>
        ) : (
          <table className="mt-3 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-3">When</th>
                <th className="py-2 pr-3">From</th>
                <th className="py-2 pr-3">Subject</th>
                <th className="py-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} className="border-b border-gray-100 align-top">
                  <td className="py-2 pr-3 whitespace-nowrap text-gray-500">
                    {new Date(m.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    {m.fullName}
                    <div className="text-xs text-gray-500">{m.email}</div>
                    {m.wantsPartnership && (
                      <span className="mt-1 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                        Wants partnership
                      </span>
                    )}
                  </td>
                  <td className="py-2 pr-3">{m.subject}</td>
                  <td className="py-2">{m.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Newsletter signups — includes non-users, anyone who subscribed on the public site */}
      <Card title="Newsletter Signups" count={subscriptions?.length ?? null}>
        {subscriptions === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : subscriptions.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">No newsletter signups yet.</p>
        ) : (
          <table className="mt-3 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-3">When</th>
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((s) => (
                <tr key={s.id} className="border-b border-gray-100">
                  <td className="py-2 pr-3 whitespace-nowrap text-gray-500">
                    {new Date(s.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 pr-3 whitespace-nowrap">{s.firstName}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">{s.email}</td>
                  <td className="py-2">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-medium ${
                        s.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s.isActive ? "Active" : "Unsubscribed"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Partnership requests — same public contact surface as the messages above */}
      <Card title="Partnership Requests" count={partnerRequests?.length ?? null}>
        {partnerRequests === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : partnerRequests.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">No partnership requests yet.</p>
        ) : (
          <table className="mt-3 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-3">When</th>
                <th className="py-2 pr-3">Organization</th>
                <th className="py-2 pr-3">Contact</th>
                <th className="py-2 pr-3">Sponsorship?</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {partnerRequests.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 align-top">
                  <td className="py-2 pr-3 whitespace-nowrap text-gray-500">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 pr-3">{p.organizationName}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    {p.fullName}
                    <div className="text-xs text-gray-500">{p.email}</div>
                  </td>
                  <td className="py-2 pr-3">{p.wantsSponsorship ? "Yes" : "No"}</td>
                  <td className="py-2">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
