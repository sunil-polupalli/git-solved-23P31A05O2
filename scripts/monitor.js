/**
 * DevOps Simulator - System Monitoring Script
 * Supports both production and development modes
 */

const ENV = process.env.NODE_ENV || 'production';

const monitorConfig = {
  production: {
    interval: 60000,         // 60 seconds
    alertThreshold: 80,      // CPU usage % threshold
    debugMode: false
  },
  development: {
    interval: 5000,          // 5 seconds
    alertThreshold: 90,
    debugMode: true,
    verboseLogging: true
  }
};

// ✅ Safe fallback if ENV is invalid
const config = monitorConfig[ENV] || monitorConfig.production;

console.log('=================================');
console.log(' DevOps Simulator - Monitor');
console.log('=================================');
console.log(`Environment : ${ENV}`);
console.log(`Debug Mode  : ${config.debugMode ? 'ENABLED' : 'DISABLED'}`);
console.log(`Interval    : ${config.interval / 1000}s`);
console.log('=================================');

function checkSystemHealth() {
  const timestamp = new Date().toISOString();
  const cpuUsage = Math.floor(Math.random() * 100); // Simulate CPU usage
  const memoryUsage = Math.floor(Math.random() * 100); // Simulate memory usage
  const diskUsage = Math.floor(Math.random() * 100); // Simulate disk usage

  if (config.debugMode) {
    console.log(`\n[${timestamp}] === DETAILED HEALTH CHECK ===`);
  } else {
    console.log(`[${timestamp}] Checking system health...`);
  }

  console.log(`✓ CPU usage: ${cpuUsage}%`);
  console.log(`✓ Memory usage: ${memoryUsage}%`);
  console.log(`✓ Disk usage: ${diskUsage}%`);

  // ⚠️ Simple alert system based on CPU usage
  if (cpuUsage > config.alertThreshold) {
    console.warn(`⚠️ ALERT: CPU usage exceeded threshold (${cpuUsage}% > ${config.alertThreshold}%)`);
  }

  // Extra details for dev mode
  if (config.debugMode) {
    console.log('✓ Hot reload: Active');
    console.log('✓ Debug port: 9229');
    console.log('✓ Verbose logging:', config.verboseLogging ? 'Enabled' : 'Disabled');
  }

  const overallHealth =
    cpuUsage > config.alertThreshold || memoryUsage > 90 || diskUsage > 95
      ? '⚠️ HIGH LOAD'
      : '✅ HEALTHY';
  console.log(`System Status: ${overallHealth}`);
}

console.log(`Monitoring every ${config.interval / 1000}s...`);
checkSystemHealth(); // Run immediately
setInterval(checkSystemHealth, config.interval);

// 🧹 Graceful shutdown on Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 Monitoring stopped by user.');
  process.exit(0);
});
