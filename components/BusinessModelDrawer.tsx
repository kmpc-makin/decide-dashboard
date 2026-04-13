'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Search, X, Building2, ChevronRight } from 'lucide-react';
import { BusinessModel } from '@/types/businessModel';
import { BUSINESS_MODELS, searchBusinessModels } from '@/lib/data/businessModels';
import SectorChip from './SectorChip';

interface BusinessModelDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: BusinessModel | null;
  onSelectModel: (model: BusinessModel) => void;
}

export default function BusinessModelDrawer({
  isOpen,
  onClose,
  selectedModel,
  onSelectModel,
}: BusinessModelDrawerProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter business models based on search query
  const filteredModels = useMemo(() => {
    return searchBusinessModels(searchQuery);
  }, [searchQuery]);

  const handleSelectModel = (model: BusinessModel) => {
    onSelectModel(model);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Business Models
                  </h2>
                </div>
                <Button
                  isIconOnly
                  variant="light"
                  onPress={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Search Input */}
              <Input
                placeholder="Search business models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search className="w-4 h-4 text-gray-400" />}
                endContent={
                  searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )
                }
                className="w-full"
                classNames={{
                  input: 'text-sm',
                  inputWrapper: 'border-gray-200 dark:border-gray-700',
                }}
              />

              {/* Results Count */}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {filteredModels.length} {filteredModels.length === 1 ? 'model' : 'models'} found
              </p>
            </div>

            {/* Business Models List */}
            <div className="flex-1 overflow-y-auto">
              {filteredModels.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    No business models found
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Try a different search term
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredModels.map((model) => (
                    <motion.button
                      key={model.id}
                      onClick={() => handleSelectModel(model)}
                      className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                        selectedModel?.id === model.id
                          ? 'bg-primary/5 dark:bg-primary/10 border-l-4 border-primary'
                          : ''
                      }`}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                            {model.name}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                            {model.description}
                          </p>
                          <SectorChip sector={model.sector} size="sm" />
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 flex-shrink-0 transition-colors ${
                            selectedModel?.id === model.id
                              ? 'text-primary'
                              : 'text-gray-400'
                          }`}
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Select a business model to view its KPIs
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
