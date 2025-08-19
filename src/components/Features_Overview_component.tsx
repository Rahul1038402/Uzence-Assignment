export const Features_Overview_component = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
            <section id='features' className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 pt-12 scroll-mt-24">
                <h2 className="text-3xl text-purple-600 [text-shadow:0_0_6px_rgba(167,139,250,0.3)] text-center font-semibold text-component-header mb-12">
                    Features Implemented
                </h2>

                {/* InputField Features */}
                <div className="mb-12 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                        ✅ InputField Component Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700 dark:text-green-300">
                        <div className="space-y-2">
                            <div>🎨 <strong>Multiple variants</strong> - Filled, outlined, ghost styles</div>
                            <div>📏 <strong>Size options</strong> - Small, medium, large sizes</div>
                            <div>✅ <strong>Validation states</strong> - Error messages & styling</div>
                            <div>⏳ <strong>Loading state</strong> - Spinner during processing</div>
                        </div>
                        <div className="space-y-2">
                            <div>🚫 <strong>Disabled state</strong> - Non-interactive mode</div>
                            <div>🧹 <strong>Clear button</strong> - Easy input clearing</div>
                            <div>👁️ <strong>Password toggle</strong> - Show/hide password</div>
                            <div>🌙 <strong>Dark mode</strong> - Automatic theme support</div>
                        </div>
                    </div>
                </div>

                {/* DataTable Features */}
                <div className="mb-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                        ✅ DataTable Component Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300">
                        <div className="space-y-2">
                            <div>📊 <strong>Display tabular data</strong> - Structured data presentation</div>
                            <div>🔄 <strong>Column sorting</strong> - Click headers to sort</div>
                            <div>☑️ <strong>Row selection (multiple)</strong> - Checkbox selection</div>
                            <div>⚪ <strong>Row selection (single)</strong> - Radio button selection</div>
                        </div>
                        <div className="space-y-2">
                            <div>⏳ <strong>Loading state</strong> - Spinner/skeleton while loading</div>
                            <div>📭 <strong>Empty state</strong> - Custom messages when no data</div>
                            <div>🎨 <strong>Custom cell rendering</strong> - Rich content in cells</div>
                            <div>📱 <strong>Responsive design</strong> - Mobile-friendly layout</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}