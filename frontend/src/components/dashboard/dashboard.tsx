'use client';

export function Dashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Security Status Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Security Status</h3>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <p className="text-gray-300 text-sm mb-3">
          All OWASP Top 10 protections are active
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Authentication</span>
            <span className="text-green-400">✓ Secure</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Input Validation</span>
            <span className="text-green-400">✓ Active</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Rate Limiting</span>
            <span className="text-green-400">✓ Enabled</span>
          </div>
        </div>
      </div>

      {/* API Status Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">API Health</h3>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
        <p className="text-gray-300 text-sm mb-3">
          Backend services are running smoothly
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Database</span>
            <span className="text-blue-400">✓ Connected</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Redis Cache</span>
            <span className="text-blue-400">✓ Active</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Response Time</span>
            <span className="text-blue-400">&lt; 50ms</span>
          </div>
        </div>
      </div>

      {/* Features Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Features</h3>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
        </div>
        <p className="text-gray-300 text-sm mb-3">
          Production-ready security features
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">JWT Auth</span>
            <span className="text-purple-400">✓ Enabled</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Audit Logging</span>
            <span className="text-purple-400">✓ Active</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Docker Ready</span>
            <span className="text-purple-400">✓ Configured</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="md:col-span-2 lg:col-span-3 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            View API Docs
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            Health Check
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            Audit Logs
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            Security Report
          </button>
        </div>
      </div>
    </div>
  );
}