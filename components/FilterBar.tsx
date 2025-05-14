import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Platform,
  Modal,
  FlatList,
  Pressable
} from 'react-native';
import { SlidersHorizontal, ChevronDown, X, Check } from 'lucide-react-native';
import { colors, radius, spacing } from '@/constants/theme';
import Button from '@/components/ui/Button';

interface FilterOption {
  id: string;
  label: string;
}

export interface Filters {
  type?: string;
  brand?: string;
  shape?: string;
  material?: string;
  priceRange?: string;
}

interface FilterBarProps {
  options: FilterOption[];
  selectedOption: string;
  onSelectOption: (id: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const BRANDS = [
  'All Brands', 'Ray-Ban', 'Oakley', 'Persol', 'Oliver Peoples', 
  'Tom Ford', 'Warby Parker', 'Moscot', 'Gentle Monster'
];

const SHAPES = [
  'All Shapes', 'Round', 'Square', 'Rectangle', 'Oval', 
  'Cat Eye', 'Aviator', 'Wayfarer', 'Oversized'
];

const MATERIALS = [
  'All Materials', 'Acetate', 'Metal', 'Titanium', 'Mixed Materials',
  'Bio-Acetate', 'Carbon Fiber', 'Wood'
];

const PRICE_RANGES = [
  'All Prices',
  'Under $100',
  '$100 - $200',
  '$200 - $300',
  '$300+'
];

const FilterBar = ({ 
  options, 
  selectedOption, 
  onSelectOption,
  filters,
  onFiltersChange
}: FilterBarProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempFilters, setTempFilters] = useState<Filters>(filters);

  const handleApplyFilters = () => {
    onFiltersChange(tempFilters);
    setIsModalVisible(false);
  };

  const renderFilterSection = (title: string, items: string[], currentValue: string | undefined, onSelect: (value: string) => void) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterSectionTitle}>{title}</Text>
      <View style={styles.filterOptions}>
        {items.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterOption,
              currentValue === item && styles.filterOptionSelected
            ]}
            onPress={() => onSelect(item)}
          >
            <Text 
              style={[
                styles.filterOptionText,
                currentValue === item && styles.filterOptionTextSelected
              ]}
            >
              {item}
            </Text>
            {currentValue === item && (
              <Check size={16} color={colors.text.inverted} style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={() => setIsModalVisible(true)}
      >
        <SlidersHorizontal size={18} color={colors.text.primary} />
        <Text style={styles.filterButtonText}>Filters</Text>
        <ChevronDown size={16} color={colors.text.primary} />
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.optionsContainer}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedOption === option.id && styles.selectedOptionButton,
            ]}
            onPress={() => onSelectOption(option.id)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === option.id && styles.selectedOptionText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Frames</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <X size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {renderFilterSection('Brand', BRANDS, tempFilters.brand, 
                (value) => setTempFilters(prev => ({ ...prev, brand: value }))
              )}
              
              {renderFilterSection('Frame Shape', SHAPES, tempFilters.shape,
                (value) => setTempFilters(prev => ({ ...prev, shape: value }))
              )}
              
              {renderFilterSection('Material', MATERIALS, tempFilters.material,
                (value) => setTempFilters(prev => ({ ...prev, material: value }))
              )}
              
              {renderFilterSection('Price Range', PRICE_RANGES, tempFilters.priceRange,
                (value) => setTempFilters(prev => ({ ...prev, priceRange: value }))
              )}
            </ScrollView>

            <View style={styles.modalFooter}>
              <Button
                title="Reset"
                variant="outline"
                onPress={() => setTempFilters({})}
                style={styles.footerButton}
              />
              <Button
                title="Apply Filters"
                onPress={handleApplyFilters}
                style={styles.footerButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      }
    }),
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.secondary,
    marginRight: spacing.md,
  },
  filterButtonText: {
    marginHorizontal: spacing.xs,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  optionsContainer: {
    paddingRight: spacing.md,
  },
  optionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    marginRight: spacing.sm,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedOptionButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  selectedOptionText: {
    color: colors.text.inverted,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: '90%',
    paddingTop: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  filterSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    margin: spacing.xs,
    minWidth: 100,
  },
  filterOptionSelected: {
    backgroundColor: colors.primary,
  },
  filterOptionText: {
    fontSize: 14,
    color: colors.text.secondary,
    flex: 1,
  },
  filterOptionTextSelected: {
    color: colors.text.inverted,
    fontWeight: '500',
  },
  checkIcon: {
    marginLeft: spacing.xs,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
});

export default FilterBar;