'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Spinner } from '@heroui/spinner';
import { Database, ChevronDown, MapPin } from 'lucide-react';
import { useGraphDBBusinessModels } from '@/lib/hooks/useGraphDB';
import type { GraphDBBusinessModel } from '@/lib/sparql/queries';
import { WHEY_PROTEIN_ENTRY } from '@/lib/mock/whey-kpis';

interface BusinessModelSelectorProps {
  selected: GraphDBBusinessModel | null;
  onSelect: (model: GraphDBBusinessModel | null) => void;
}

/** CEBM selector dropdown. Fetches models from the data platform. */
export default function BusinessModelSelector({
  selected,
  onSelect,
}: BusinessModelSelectorProps) {
  const { models, isLoading } = useGraphDBBusinessModels();
  const [open, setOpen] = useState(false);

  // Prepend the synthetic mock entry so it always appears first.
  const allModels: GraphDBBusinessModel[] = [
    WHEY_PROTEIN_ENTRY as GraphDBBusinessModel,
    ...models,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card
        isBlurred
        className="bg-white/60 dark:bg-default-100/50 border-none"
        shadow="sm"
      >
        <CardBody className="p-0">
          {isLoading ? (
            <div className="flex items-center gap-3 p-4">
              <Spinner size="sm" />
              <span className="text-sm text-default-500">
                Loading business models…
              </span>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between p-4 hover:bg-default-100/50 transition-colors rounded-xl"
              >
                {selected ? (
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Database className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0 text-left">
                      <h3 className="font-semibold text-sm text-foreground truncate">
                        {selected.label}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        {selected.cebmType && (
                          <Chip size="sm" variant="flat" color="primary">
                            {selected.cebmType}
                          </Chip>
                        )}
                        {selected.sector && (
                          <Chip size="sm" variant="flat" color="secondary">
                            {selected.sector}
                          </Chip>
                        )}
                        {selected.region && (
                          <span className="text-xs text-default-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {selected.region}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-default-400" />
                    <span className="text-sm text-default-500">
                      Select a business model from the data platform
                    </span>
                  </div>
                )}
                <ChevronDown
                  className={`w-4 h-4 text-default-400 transition-transform ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden border-t border-default-200"
                  >
                    <div className="max-h-64 overflow-y-auto">
                      {selected && (
                        <button
                          onClick={() => {
                            onSelect(null);
                            setOpen(false);
                          }}
                          className="w-full text-left p-3 hover:bg-default-100/80 transition-colors border-b border-default-100"
                        >
                          <span className="text-xs text-default-500">
                            Clear selection
                          </span>
                        </button>
                      )}
                      {allModels.map((model) => (
                        <button
                          key={model.uri}
                          onClick={() => {
                            onSelect(model);
                            setOpen(false);
                          }}
                          className={`w-full text-left p-3 hover:bg-default-100/80 transition-colors ${
                            selected?.uri === model.uri
                              ? 'bg-primary/5 border-l-3 border-primary'
                              : ''
                          }`}
                        >
                          <p className="text-sm font-medium text-foreground truncate">
                            {model.label}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-default-400">
                            {model.cebmType &&
                              model.cebmType !== 'Unknown' &&
                              model.cebmType !== 'None' && (
                                <span>{model.cebmType}</span>
                              )}
                            {model.sector && <span>· {model.sector}</span>}
                            {model.region && <span>· {model.region}</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}
