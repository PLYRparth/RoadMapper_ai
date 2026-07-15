import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const Settings = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-16 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
            Preferences
          </p>

          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-white">
            Settings
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Manage your workspace, application preferences and roadmap data.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Workspace */}

          <Card hover={false}>
            <h2 className="text-xl font-semibold">
              Workspace
            </h2>

            <div className="mt-8 space-y-6">

              <div>
                <p className="text-sm text-zinc-500">
                  Application
                </p>

                <p className="mt-1 text-white">
                  Roadmapper AI
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Version
                </p>

                <p className="mt-1 text-white">
                  v1.0.0
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">
                  Developer
                </p>

                <p className="mt-1 text-white">
                  Parth Singhal
                </p>
              </div>

            </div>
          </Card>

          {/* Appearance */}

          <Card hover={false}>
            <h2 className="text-xl font-semibold">
              Appearance
            </h2>

            <div className="mt-8">

              <div className="flex items-center justify-between">

                <div>

                  <p className="font-medium">
                    Theme
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Dark mode is currently the default.
                  </p>

                </div>

                <span className="rounded-full border border-zinc-700 px-4 py-2 text-sm">
                  Dark
                </span>

              </div>

            </div>
          </Card>

          {/* Data */}

          <Card hover={false}>
            <h2 className="text-xl font-semibold">
              Data
            </h2>

            <p className="mt-3 text-sm text-zinc-400">
              Export or import your roadmap data.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Button variant="secondary">
                Export JSON
              </Button>

              <Button variant="secondary">
                Import JSON
              </Button>

            </div>
          </Card>

          {/* About */}

          <Card hover={false}>
            <h2 className="text-xl font-semibold">
              About
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Roadmapper AI helps you convert long-term goals into structured daily roadmaps powered by AI.
            </p>

            <div className="mt-8">

              <a
                href="https://github.com/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white hover:underline"
              >
                View GitHub →
              </a>

            </div>

          </Card>

        </div>

        {/* Danger Zone */}

        <Card
          hover={false}
          className="mt-12 border-red-500/20"
        >

          <h2 className="text-xl font-semibold text-red-400">
            Danger Zone
          </h2>

          <p className="mt-3 text-sm text-zinc-400">
            These actions permanently modify your data.
          </p>

          <div className="mt-8">

            <Button variant="danger">
              Clear All Roadmaps
            </Button>

          </div>

        </Card>

      </div>
    </Layout>
  );
};

export default Settings;